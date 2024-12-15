const Booking = require('../models/Booking');
const User = require('../models/User'); // Assuming User model is already defined
const mongoose = require('mongoose');

const createBooking = async (req, res) => {
  console.log("--->",req.user)
  try {
    const { packageId, customerName, email, phone, numberOfTravelers, specialRequests, totalPrice } = req.body;

    // Make sure all required fields are provided
    if (!customerName || !email || !phone || !numberOfTravelers || !totalPrice || !packageId) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided.'
      });
    }

    // Create a new booking document
    const newBooking = new Booking({
      packageId,
      customerName,
      email,
      phone,
      numberOfTravelers,
      specialRequests,
      totalPrice
    });

    // Save the booking to the database
    const savedBooking = await newBooking.save();

    // Optionally, update the user's bookings array (if userId is part of the request)
    if (req.user && req.user.id) {  // Assuming user info is available in the request (via token)
      console.log("user------>",req.user)
      await User.findByIdAndUpdate(
        req.user.id,
        { $push: { bookings: savedBooking._id } },
        { new: true }
      );
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully and added to user.',
      data: savedBooking
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('packageId userId');

    res.json({
      success: true,
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a booking by ID
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid booking ID.' });
    }

    const booking = await Booking.findById(id).populate('packageId userId');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    res.json({
      success: true,
      data: booking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get bookings for a specific user
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID.' });
    }

    const user = await User.findById(userId).populate({
      path: 'bookings',
      populate: { path: 'packageId' }, // Populate package details for each booking
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.json({
      success: true,
      data: user.bookings,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  getUserBookings,
};
