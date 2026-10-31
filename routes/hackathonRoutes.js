const express = require("express");
const router = express.Router();
const hackathonController = require("../controllers/hackathonController");

router.get("/", hackathonController.getHackathons);
router.post("/:id/bookmark", hackathonController.bookmarkHackathon);
router.post("/:id/register", hackathonController.registerHackathon);

module.exports = router;
