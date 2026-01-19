const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');

// POST /api/enquiries - Create new enquiry
router.post('/', enquiryController.createEnquiry);

// GET /api/enquiries - Get all enquiries
router.get('/', enquiryController.getAllEnquiries);

// GET /api/enquiries/:id - Get enquiry by ID
router.get('/:id', enquiryController.getEnquiryById);

// DELETE /api/enquiries/:id - Delete enquiry
router.delete('/:id', enquiryController.deleteEnquiry);

module.exports = router;
