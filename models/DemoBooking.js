const mongoose = require("mongoose");

const demoBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  batchTime: {
    type: String,
    required: true,
    trim: true,
  },
  batchLabel: {
    type: String,
    trim: true,
  },
  courseName: {
    type: String,
    required: true,
    default: "Data Analytics & BI",
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("DemoBooking", demoBookingSchema);
