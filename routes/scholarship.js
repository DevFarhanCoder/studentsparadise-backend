const express = require("express");
const router = express.Router();
const { submitScholarshipResponse, checkMobile } = require("../controllers/scholarshipController");

router.post("/", submitScholarshipResponse);
router.get("/check/:mobile", checkMobile);

module.exports = router;
