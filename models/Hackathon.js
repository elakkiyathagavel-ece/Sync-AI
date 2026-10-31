const mongoose = require("mongoose");

const hackathonSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        organizer: { type: String, required: true },
        domain: { type: String, required: true },
        mode: { type: String, default: "Online" },
        location: { type: String, default: "Online" },
        prize: { type: String, default: "₹1,00,000" },
        deadline: { type: String, default: "7 Days Left" },
        daysRemaining: { type: Number, default: 7 },
        dates: { type: String, default: "Upcoming" },
        description: { type: String, default: "" },
        tags: { type: [String], default: [] },
        registrationOpen: { type: Boolean, default: true },
        bookmarkedBy: { type: [String], default: [] },
        registeredUsers: { type: [String], default: [] }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Hackathon", hackathonSchema);
