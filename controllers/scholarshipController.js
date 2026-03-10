const ScholarshipResponse = require("../models/ScholarshipResponse");
const OTPSession = require("../models/OTPSession");

const submitScholarshipResponse = async (req, res) => {
  try {
    const { fullName, mobile, stream, answers, score, totalQuestions } = req.body;
    const response = new ScholarshipResponse({
      fullName,
      mobile,
      stream,
      answers,
      score,
      totalQuestions,
    });
    await response.save();
    res.status(201).json({ success: true, message: "Scholarship response saved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const checkMobile = async (req, res) => {
  try {
    const { mobile } = req.params;
    const exists = await ScholarshipResponse.exists({ mobile });
    res.json({ exists: !!exists });
  } catch (error) {
    res.status(500).json({ exists: false, message: error.message });
  }
};

const sendOTP = async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile || mobile.length !== 10) {
      return res.status(400).json({ success: false, message: "Invalid mobile number" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Remove any previous OTP for this number
    await OTPSession.deleteMany({ mobile });
    await OTPSession.create({ mobile, otp, expiresAt });

    // Send SMS via Fast2SMS
    if (process.env.FAST2SMS_API_KEY) {
      try {
        await fetch("https://www.fast2sms.com/dev/bulkV2", {
          method: "POST",
          headers: {
            authorization: process.env.FAST2SMS_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            route: "q",
            message: `Your Students Paradise Scholarship OTP is ${otp}. Valid for 10 minutes. Do not share with anyone.`,
            language: "english",
            flash: 0,
            numbers: mobile,
          }),
        });
      } catch (smsError) {
        console.error("SMS send error:", smsError);
      }
    } else {
      // No SMS key configured — log OTP for testing
      console.log(`[OTP] Mobile: ${mobile} | OTP: ${otp}`);
    }

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const session = await OTPSession.findOne({
      mobile,
      otp,
      expiresAt: { $gt: new Date() },
    });
    if (!session) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }
    await OTPSession.deleteOne({ _id: session._id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { submitScholarshipResponse, checkMobile, sendOTP, verifyOTP };
