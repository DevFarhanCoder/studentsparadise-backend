const express = require("express");
const router = express.Router();
const {
  createITEnquiry,
  getAllITEnquiries,
  getITEnquiryById,
  deleteITEnquiry,
  updateEnquiryStatus,
} = require("../controllers/itEnquiryController");

// @route   POST /api/it-enquiries
// @desc    Create new IT course enquiry
// @access  Public
router.post("/", createITEnquiry);

// @route   GET /api/it-enquiries
// @desc    Get all IT enquiries
// @access  Public (should be protected in production)
router.get("/", getAllITEnquiries);

// @route   GET /api/it-enquiries/:id
// @desc    Get IT enquiry by ID
// @access  Public (should be protected in production)
router.get("/:id", getITEnquiryById);

// @route   DELETE /api/it-enquiries/:id
// @desc    Delete IT enquiry
// @access  Public (should be protected in production)
router.delete("/:id", deleteITEnquiry);

// @route   PUT /api/it-enquiries/:id/status
// @desc    Update enquiry status
// @access  Public (should be protected in production)
router.put("/:id/status", updateEnquiryStatus);

module.exports = router;
