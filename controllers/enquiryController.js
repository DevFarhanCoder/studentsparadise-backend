const Enquiry = require('../models/Enquiry');

// Create new enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message, businessName, courseName } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !businessName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, phone, and businessName'
      });
    }

    // Create new enquiry
    const enquiry = new Enquiry({
      name,
      email,
      phone,
      message,
      businessName,
      courseName
    });

    await enquiry.save();

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully!',
      data: enquiry
    });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit enquiry. Please try again.',
      error: error.message
    });
  }
};

// Get all enquiries
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiries',
      error: error.message
    });
  }
};

// Get enquiry by ID
exports.getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    console.error('Error fetching enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiry',
      error: error.message
    });
  }
};

// Delete enquiry
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete enquiry',
      error: error.message
    });
  }
};
