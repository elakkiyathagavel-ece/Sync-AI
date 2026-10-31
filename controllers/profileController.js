const dbStore = require("../data/dbStore");

// SAVE OR UPDATE PROFILE (ONE TIME SETUP & EDIT)
exports.saveProfile = async (req, res) => {
    try {
        const {
            collegeEmail,
            email,
            collegeName,
            course,
            department,
            year,
            domains,
            region,
            state,
            district,
            city,
            bio,
            github,
            linkedin,
            availability,
            technicalSkills
        } = req.body;

        const targetEmail = (collegeEmail || email || "").toLowerCase().trim();

        if (!targetEmail) {
            return res.status(400).json({
                success: false,
                message: "College email is required to save profile."
            });
        }

        const user = await dbStore.users.findOne({ collegeEmail: targetEmail });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User account not found."
            });
        }

        const profileData = {
            collegeName: (collegeName || user.college || "").trim(),
            course: (course || "").trim(),
            department: (department || "").trim(),
            year: (year || "").trim(),
            domains: Array.isArray(domains) ? domains : (user.preferredDomains || []),
            region: region || user.region || "",
            state: state || user.state || "",
            district: district || user.district || "",
            city: (city || "").trim(),
            bio: (bio || "").trim(),
            github: (github || "").trim(),
            linkedin: (linkedin || "").trim(),
            availability: availability || "Flexible",
            profileCompletedAt: user.profileCompletedAt || new Date().toISOString()
        };

        const updatedUser = await dbStore.users.updateOne(
            { collegeEmail: targetEmail },
            {
                profile: profileData,
                profileCompleted: true, // Marks profile as permanently created!
                profileCompletedAt: profileData.profileCompletedAt,
                preferredDomains: profileData.domains,
                region: profileData.region,
                state: profileData.state,
                district: profileData.district,
                technicalSkills: technicalSkills || user.technicalSkills || ["HTML", "CSS", "JavaScript", "Python"],
                xpPoints: (user.xpPoints || 100) + 150 // XP award for profile completion
            }
        );

        res.status(200).json({
            success: true,
            message: "Profile saved successfully! Opening your SYNC AI dashboard.",
            profileCompleted: true,
            user: {
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                name: updatedUser.fullName,
                college: profileData.collegeName,
                collegeName: profileData.collegeName,
                collegeEmail: updatedUser.collegeEmail,
                email: updatedUser.collegeEmail,
                degree: profileData.course,
                department: profileData.department,
                year: profileData.year,
                region: profileData.region,
                state: profileData.state,
                district: profileData.district,
                city: profileData.city,
                currentCity: profileData.city,
                bio: profileData.bio,
                github: profileData.github,
                linkedin: profileData.linkedin,
                availability: profileData.availability,
                preferredDomains: profileData.domains,
                technicalSkills: updatedUser.technicalSkills,
                skills: updatedUser.technicalSkills,
                verifiedSkillScore: updatedUser.verifiedSkillScore || updatedUser.assessmentResult?.overallScore || 0,
                growthScore: updatedUser.growthScore || 78,
                learningStreak: updatedUser.learningStreak || 7,
                xpPoints: updatedUser.xpPoints || 450,
                profileCompleted: true,
                profileCompletedAt: updatedUser.profileCompletedAt,
                profile: profileData
            },
            nextPage: "dashboard.html"
        });

    } catch (error) {
        console.error("Save profile error:", error);
        res.status(500).json({
            success: false,
            message: "Server error saving profile: " + error.message
        });
    }
};

// GET PROFILE
exports.getProfile = async (req, res) => {
    try {
        const email = (req.query.email || req.params.email || req.headers["x-user-email"] || "").toLowerCase().trim();

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required."
            });
        }

        const user = await dbStore.users.findOne({ collegeEmail: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Profile not found."
            });
        }

        const profile = user.profile || {};

        res.status(200).json({
            success: true,
            profile: {
                fullName: user.fullName,
                name: user.fullName,
                college: profile.collegeName || user.college,
                collegeName: profile.collegeName || user.college,
                collegeEmail: user.collegeEmail,
                email: user.collegeEmail,
                degree: profile.course || "-",
                course: profile.course || "-",
                department: profile.department || "-",
                year: profile.year || "-",
                region: profile.region || user.region || "-",
                state: profile.state || user.state || "-",
                district: profile.district || user.district || "-",
                city: profile.city || "-",
                currentCity: profile.city || "-",
                bio: profile.bio || "",
                github: profile.github || "",
                linkedin: profile.linkedin || "",
                availability: profile.availability || "Flexible",
                preferredDomains: profile.domains || user.preferredDomains || ["Web Development", "AI / Machine Learning"],
                technicalSkills: user.technicalSkills || ["HTML", "CSS", "JavaScript", "Python"],
                skills: user.technicalSkills || ["HTML", "CSS", "JavaScript", "Python"],
                verifiedSkillScore: user.verifiedSkillScore || user.assessmentResult?.overallScore || 0,
                growthScore: user.growthScore || 78,
                learningStreak: user.learningStreak || 7,
                xpPoints: user.xpPoints || 450,
                profileCompleted: !!user.profileCompleted
            }
        });

    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({
            success: false,
            message: "Server error fetching profile."
        });
    }
};

// UPDATE SKILLS
exports.updateSkills = async (req, res) => {
    try {
        const { email, skills } = req.body;
        if (!email || !Array.isArray(skills)) {
            return res.status(400).json({ success: false, message: "Valid email and skills array required." });
        }

        const updated = await dbStore.users.updateOne(
            { collegeEmail: email.toLowerCase().trim() },
            { technicalSkills: skills }
        );

        res.status(200).json({
            success: true,
            message: "Skills updated successfully.",
            skills: updated.technicalSkills
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
