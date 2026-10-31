const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.get("/", teamController.getTeams);
router.post("/", teamController.createTeam);
router.post("/match", teamController.matchTeams);
router.post("/:id/apply", teamController.applyTeam);
router.get("/my-teams", teamController.getMyTeams);

module.exports = router;
