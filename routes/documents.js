const express = require("express");
const router = express.Router();
const {
  getAllDocuments,
  getDocumentById,
  uploadDocument,
  updateDocument,
  deleteDocument,
  incrementDownload,
} = require("../controllers/documentController");

// Public routes
router.get("/", getAllDocuments);
router.get("/:id", getDocumentById);
router.post("/:id/download", incrementDownload);

// Admin routes (in production, add authentication middleware)
router.post("/upload", uploadDocument);
router.put("/:id", updateDocument);
router.delete("/:id", deleteDocument);

module.exports = router;
