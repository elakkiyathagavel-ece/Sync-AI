const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        userId: { type: String, default: "all" },
        title: { type: String, required: true },
        message: { type: String, required: true },
        time: { type: String, default: "Just now" },
        type: { type: String, default: "system" },
        read: { type: Boolean, default: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
