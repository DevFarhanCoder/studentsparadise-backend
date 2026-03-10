const express = require("express");
const router = express.Router();
const {
  submitScholarshipResponse,
  checkMobile,
  sendOTP,
  verifyOTP,
} = require("../controllers/scholarshipController");

router.post("/", submitScholarshipResponse);
router.get("/check/:mobile", checkMobile);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

module.exports = router;
