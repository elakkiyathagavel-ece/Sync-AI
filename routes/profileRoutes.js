const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.post("/", profileController.saveProfile);
router.put("/", profileController.saveProfile);
router.get("/:email", profileController.getProfile);
router.get("/", profileController.getProfile);
router.put("/skills", profileController.updateSkills);

module.exports = router;
