const mongoose = require("mongoose");

const itEnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  },
  businessName: {
    type: String,
    required: true,
    default: "Students Paradise - IT Courses",
  },
  courseName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "IT Course Enquiry",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ITEnquiry", itEnquirySchema);
