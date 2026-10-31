const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

router.get("/", notificationController.getNotifications);
router.put("/:id/read", notificationController.markAsRead);
router.post("/read-all", (req, res) => notificationController.markAsRead({ params: { id: "all" } }, res));

module.exports = router;
