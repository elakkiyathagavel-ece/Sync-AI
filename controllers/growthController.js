const dbStore = require("../data/dbStore");

exports.getGrowth = async (req, res) => {
    try {
        const email = req.query.email || req.headers["x-user-email"];
        let user = null;
        if (email) {
            user = await dbStore.users.findOne({ collegeEmail: email.toLowerCase().trim() });
        }

        const growthData = {
            growthScore: user?.growthScore || 78,
            learningStreak: user?.learningStreak || 7,
            xpPoints: user?.xpPoints || 450,
            verifiedSkillScore: user?.verifiedSkillScore || 85,
            level: Math.floor((user?.xpPoints || 450) / 100) + 1,
            milestones: [
                { title: "Account Created & Verified", completed: true, xp: 50 },
                { title: "Skill Assessment Completed", completed: !!user?.assessmentCompleted, xp: 150 },
                { title: "Profile Finalized", completed: !!user?.profileCompleted, xp: 100 },
                { title: "Join or Create First Team", completed: true, xp: 150 }
            ],
            weeklyActivity: [
                { day: "Mon", score: 65 },
                { day: "Tue", score: 70 },
                { day: "Wed", score: 72 },
                { day: "Thu", score: 75 },
                { day: "Fri", score: 78 },
                { day: "Sat", score: 82 },
                { day: "Sun", score: 85 }
            ]
        };

        res.status(200).json({
            success: true,
            growth: growthData
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
