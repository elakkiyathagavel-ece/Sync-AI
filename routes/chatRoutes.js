const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/conversations", chatController.getConversations);
router.get("/:conversationId/messages", chatController.getMessages);
router.post("/:conversationId/messages", chatController.sendMessage);

module.exports = router;
