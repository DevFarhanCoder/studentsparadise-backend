const express = require("express");
const router = express.Router();
const { createDemoBooking, getAllDemoBookings } = require("../controllers/demoBookingController");

// @route   POST /api/demo-bookings
// @desc    Book a free demo class
// @access  Public
router.post("/", createDemoBooking);

// @route   GET /api/demo-bookings
// @desc    Get all demo bookings
// @access  Public (protect in production)
router.get("/", getAllDemoBookings);

module.exports = router;
