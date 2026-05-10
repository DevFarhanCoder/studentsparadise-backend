const DemoBooking = require("../models/DemoBooking");

// Create new demo booking
exports.createDemoBooking = async (req, res) => {
  try {
    const { name, phone, batchTime, batchLabel, courseName } = req.body;

    if (!name || !phone || !batchTime) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, phone, and batchTime.",
      });
    }

    const booking = new DemoBooking({
      name,
      phone,
      batchTime,
      batchLabel: batchLabel || "",
      courseName: courseName || "Data Analytics & BI",
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Demo class booked successfully!",
      data: booking,
    });
  } catch (error) {
    console.error("Error creating demo booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to book demo class. Please try again.",
      error: error.message,
    });
  }
};

// Get all demo bookings
exports.getAllDemoBookings = async (req, res) => {
  try {
    const bookings = await DemoBooking.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching demo bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch demo bookings.",
      error: error.message,
    });
  }
};
