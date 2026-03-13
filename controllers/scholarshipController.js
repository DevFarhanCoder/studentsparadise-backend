const ScholarshipResponse = require("../models/ScholarshipResponse");

const submitScholarshipResponse = async (req, res) => {
  try {
    const { fullName, mobile, stream, answers, score, totalQuestions } = req.body;

    // Server-side validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return res.status(400).json({ success: false, message: "Invalid full name." });
    }
    if (!mobile || !/^[6-9][0-9]{9}$/.test(mobile)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid mobile number. Must be a valid 10-digit Indian number.",
        });
    }
    if (!["Science", "Commerce", "Coding"].includes(stream)) {
      return res.status(400).json({ success: false, message: "Invalid stream." });
    }
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

module.exports = { submitScholarshipResponse, checkMobile };
