const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        username: { type: String, required: true },
        college: { type: String, required: true },
        collegeEmail: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        region: { type: String, default: "" },
        state: { type: String, default: "" },
        district: { type: String, default: "" },
        preferredDomains: { type: [String], default: [] },
        
        // Verification & Step tracking
        emailVerified: { type: Boolean, default: false },
        otpCode: { type: String, default: "123456" },
        otpExpires: { type: Date },
        
        // Assessment
        assessmentCompleted: { type: Boolean, default: false },
        verifiedSkillScore: { type: Number, default: 0 },
        assessmentCompletedAt: { type: Date },
        assessmentResult: {
            overallScore: { type: Number, default: 0 },
            correctAnswers: { type: Number, default: 0 },
            totalQuestions: { type: Number, default: 15 },
            categoryScores: { type: Object, default: {} },
            categoryTotals: { type: Object, default: {} },
            completedAt: { type: Date }
        },
        
        // Profile setup - created only ONCE!
        profileCompleted: { type: Boolean, default: false },
        profileCompletedAt: { type: Date },
        profile: {
            collegeName: { type: String, default: "" },
            course: { type: String, default: "" },
            department: { type: String, default: "" },
            year: { type: String, default: "" },
            domains: { type: [String], default: [] },
            region: { type: String, default: "" },
            state: { type: String, default: "" },
            district: { type: String, default: "" },
            city: { type: String, default: "" },
            bio: { type: String, default: "" },
            github: { type: String, default: "" },
            linkedin: { type: String, default: "" },
            availability: { type: String, default: "Flexible" }
        },
        
        // Gamification / Growth
        technicalSkills: { type: [String], default: ["HTML", "CSS", "JavaScript", "Python"] },
        growthScore: { type: Number, default: 75 },
        learningStreak: { type: Number, default: 7 },
        xpPoints: { type: Number, default: 450 },
        
        // Settings
        settings: {
            emailNotifications: { type: Boolean, default: true },
            teamInvites: { type: Boolean, default: true },
            hackathonAlerts: { type: Boolean, default: true },
            showGrowthScore: { type: Boolean, default: true },
            profileVisibility: { type: String, default: "public" }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);
