const ITEnquiry = require("../models/ITEnquiry");

// Create new IT course enquiry
exports.createITEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message, businessName, courseName } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !courseName) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: name, email, phone, and courseName",
      });
    }

    // Create new IT enquiry
    const enquiry = new ITEnquiry({
      name,
      email,
      phone,
      message,
      businessName: businessName || "Students Paradise - IT Courses",
      courseName,
      category: "IT Course Enquiry",
    });

    await enquiry.save();

    res.status(201).json({
      success: true,
      message: "IT Course enquiry submitted successfully!",
      data: enquiry,
    });
  } catch (error) {
    console.error("Error creating IT enquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit enquiry. Please try again.",
      error: error.message,
    });
  }
};

// Get all IT enquiries
exports.getAllITEnquiries = async (req, res) => {
  try {
    const enquiries = await ITEnquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error("Error fetching IT enquiries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries",
      error: error.message,
    });
  }
};

// Get IT enquiry by ID
exports.getITEnquiryById = async (req, res) => {
  try {
    const enquiry = await ITEnquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "IT Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    console.error("Error fetching IT enquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch enquiry",
      error: error.message,
    });
  }
};

// Delete IT enquiry
exports.deleteITEnquiry = async (req, res) => {
  try {
    const enquiry = await ITEnquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "IT Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "IT Enquiry deleted successfully",
      data: enquiry,
    });
  } catch (error) {
    console.error("Error deleting IT enquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete enquiry",
      error: error.message,
    });
  }
};

// Update enquiry status
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const enquiry = await ITEnquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "IT Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: enquiry,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update status",
      error: error.message,
    });
  }
};
