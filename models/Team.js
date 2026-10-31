const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        hackathon: { type: String, required: true },
        domain: { type: String, required: true },
        leader: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            role: { type: String, default: "Team Leader" }
        },
        membersCount: { type: Number, default: 1 },
        maxMembers: { type: Number, default: 4 },
        requiredSkills: { type: [String], default: [] },
        members: [
            {
                name: String,
                email: String,
                role: String,
                avatar: String
            }
        ],
        compatibilityScore: { type: Number, default: 85 },
        description: { type: String, default: "" },
        region: { type: String, default: "All India" },
        openRoles: { type: [String], default: [] },
        interestedUsers: { type: [String], default: [] },
        status: { type: String, default: "Recruiting" }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
