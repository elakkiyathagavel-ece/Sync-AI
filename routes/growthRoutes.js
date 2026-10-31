const express = require("express");
const router = express.Router();
const growthController = require("../controllers/growthController");

router.get("/stats", growthController.getGrowth);
router.get("/", growthController.getGrowth);

module.exports = router;
