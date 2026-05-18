const express = require("express");
const rateLimit = require("express-rate-limit");
const { generatePDF } = require("../controllers/resumePDFController");

const router = express.Router();

// 10 PDF generations per minute per IP — prevents abuse
const pdfLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many PDF requests. Please wait a moment and try again.",
  },
});

// POST /api/resume/generate-pdf
// Body: { resumeData: ResumeData }
// Returns: PDF file (application/pdf)
router.post("/generate-pdf", pdfLimiter, generatePDF);

module.exports = router;
