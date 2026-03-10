const mongoose = require("mongoose");

const scholarshipResponseSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  stream: { type: String, required: true, enum: ["Science", "Commerce", "Coding"] },
  answers: { type: Object, required: true },
  score: { type: Number },
  totalQuestions: { type: Number },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ScholarshipResponse", scholarshipResponseSchema);
