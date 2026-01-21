/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["answer-key", "previous-paper", "mock-test", "syllabus"],
    },
    category: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: false,
    },
    year: {
      type: String,
      required: false,
    },
    session: {
      type: String,
      required: false,
    },
    shift: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: false,
    },
    uploadedBy: {
      type: String,
      required: true,
      default: "Admin",
    },
    downloads: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Index for faster queries
documentSchema.index({ type: 1, category: 1, year: 1 });

module.exports = mongoose.model("Document", documentSchema);
