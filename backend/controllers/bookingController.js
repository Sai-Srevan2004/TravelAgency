const Booking = require('../models/Booking');
const Package = require('../models/Package');
const mongoose=require('mongoose')

const generateInvoiceHTML = require('../utils/invoiceGenerator');

const createBooking = async (req, res) => {
    try {
        const { packageId, customerName, email, phone, numberOfTravelers, specialRequests } = req.body.bookingData;
       
        console.log("....>",req.body)
        // Fetch package details
        const pkg = await Package.findById(packageId);
        if (!pkg) return res.status(404).json({ error: "Package not found" });

        // Calculate total price
        const totalPrice = pkg.price * numberOfTravelers;

        // Save booking to the database
        const booking = new Booking({
            packageId,
            customerName,
            email,
            phone,
            numberOfTravelers,
            specialRequests,
            totalPrice,
        });
        await booking.save();

        // Generate invoice HTML
        const invoiceHTML = generateInvoiceHTML(booking, pkg);

        res.status(201).json({
            success:true,
            message: "Booking successful",
            data:booking,
            invoice: invoiceHTML, // Include HTML content in the response
        });
    } catch (err) {
        res.status(400).json({ success:false,message: err.message });
    }
};

// View all bookings
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('packageId');
        res.json({
            success:true,
            data:bookings
        });
    } catch (err) {
        res.status(500).json({ success:false,error: err.message });
    }
};

const getBookingById = async (req, res) => {
    try {
      const { id } = req.params;  // Extract booking ID from request parameters

      console.log(id)
  
      // Check if the ID is a valid ObjectId (MongoDB)
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({success:false, message: "Invalid booking ID" });
      }
  
      // Find the booking by ID and populate the associated package details
      const booking = await Booking.findById(id).populate('packageId');
      if (!booking) {
        return res.status(404).json({success:false, message: "Booking not found" });
      }
  
      // Send the booking details in the response
      res.json({
        success:true,
        data:booking
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({success:false, message: "Server error" });
    }
  };

module.exports = { createBooking, getBookings,getBookingById };
