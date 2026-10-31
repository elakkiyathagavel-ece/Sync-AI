const dbStore = require("../data/dbStore");

exports.getTeams = async (req, res) => {
    try {
        const { domain, hackathon, region } = req.query;
        let teams = await dbStore.teams.find();

        if (domain && domain !== "all") {
            teams = teams.filter(t => t.domain.toLowerCase().includes(domain.toLowerCase()));
        }
        if (hackathon && hackathon !== "all") {
            teams = teams.filter(t => t.hackathon.toLowerCase().includes(hackathon.toLowerCase()));
        }
        if (region && region !== "all") {
            teams = teams.filter(t => t.region.toLowerCase().includes(region.toLowerCase()));
        }

        res.status(200).json({
            success: true,
            total: teams.length,
            teams
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createTeam = async (req, res) => {
    try {
        const { name, hackathon, domain, requiredSkills, description, region, leaderName, leaderEmail, maxMembers } = req.body;

        if (!name || !hackathon || !domain) {
            return res.status(400).json({ success: false, message: "Team name, hackathon, and domain are required." });
        }

        const newTeam = await dbStore.teams.create({
            name,
            hackathon,
            domain,
            requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : (requiredSkills || "").split(",").map(s => s.trim()).filter(Boolean),
            description: description || "",
            region: region || "All India",
            leader: {
                name: leaderName || "Team Leader",
                email: leaderEmail || "",
                role: "Team Leader"
            },
            membersCount: 1,
            maxMembers: Number(maxMembers) || 4,
            members: [
                {
                    name: leaderName || "Team Leader",
                    email: leaderEmail || "",
                    role: "Leader",
                    avatar: (leaderName || "L").charAt(0).toUpperCase()
                }
            ],
            compatibilityScore: 92,
            status: "Recruiting",
            openRoles: ["Member"]
        });

        res.status(201).json({
            success: true,
            message: `Team "${name}" created successfully! Now accepting teammate applications.`,
            team: newTeam
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.matchTeams = async (req, res) => {
    try {
        const { email, domains, skills, score } = req.body;
        const allTeams = await dbStore.teams.find();

        const studentDomains = (domains || []).map(d => d.toLowerCase());
        const studentSkills = (skills || []).map(s => s.toLowerCase());
        const skillScore = Number(score) || 75;

        // AI Match Scoring Algorithm
        const matchedTeams = allTeams.map(team => {
            let matchScore = 70; // baseline
            
            // Domain alignment
            const teamDomain = team.domain.toLowerCase();
            if (studentDomains.some(d => teamDomain.includes(d) || d.includes(teamDomain))) {
                matchScore += 15;
            }

            // Skill overlap
            const required = (team.requiredSkills || []).map(r => r.toLowerCase());
            let matchedSkillsCount = 0;
            required.forEach(r => {
                if (studentSkills.some(s => s.includes(r) || r.includes(s))) {
                    matchedSkillsCount++;
                }
            });
            if (required.length > 0) {
                matchScore += Math.round((matchedSkillsCount / required.length) * 15);
            }

            // High verified skill bonus
            if (skillScore >= 80) matchScore += 5;

            // Cap at 98%
            matchScore = Math.min(Math.max(matchScore, 65), 98);

            return {
                ...team,
                compatibilityScore: matchScore,
                matchReason: `High synergy in ${team.domain} with complementary skill set.`
            };
        });

        matchedTeams.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

        res.status(200).json({
            success: true,
            totalMatches: matchedTeams.length,
            topMatch: matchedTeams[0] || null,
            teams: matchedTeams
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.applyTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, studentName } = req.body;

        const team = (await dbStore.teams.find()).find(t => t.id === id);
        if (!team) {
            return res.status(404).json({ success: false, message: "Team not found." });
        }

        const interested = team.interestedUsers || [];
        if (!interested.includes(email)) {
            interested.push(email);
            await dbStore.teams.updateOne({ id }, { interestedUsers: interested });
        }

        res.status(200).json({
            success: true,
            message: `Your application to join ${team.name} has been sent to ${team.leader?.name || "the team leader"}!`,
            teamName: team.name
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getMyTeams = async (req, res) => {
    try {
        const email = req.query.email || req.headers["x-user-email"];
        const allTeams = await dbStore.teams.find();

        let myTeams = [];
        if (email) {
            const normalized = email.toLowerCase().trim();
            myTeams = allTeams.filter(t =>
                (t.leader && t.leader.email && t.leader.email.toLowerCase() === normalized) ||
                (t.members && t.members.some(m => m.email && m.email.toLowerCase() === normalized)) ||
                (t.interestedUsers && t.interestedUsers.includes(normalized))
            );
        }

        if (myTeams.length === 0) {
            myTeams = [allTeams[0]].filter(Boolean); // fallback prototype team
        }

        res.status(200).json({
            success: true,
            total: myTeams.length,
            teams: myTeams
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
