const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        conversationId: { type: String, required: true },
        senderId: { type: String, required: true },
        senderName: { type: String, required: true },
        text: { type: String, required: true },
        time: { type: String, default: "Just now" }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
