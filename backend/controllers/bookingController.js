const Booking = require('../models/Booking');
const Package = require('../models/Package');

const generateInvoiceHTML = require('../utils/invoiceGenerator');

const createBooking = async (req, res) => {
    try {
        const { packageId, customerName, email, phone, numberOfTravelers, specialRequests } = req.body;

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
            message: "Booking successful",
            booking,
            invoice: invoiceHTML, // Include HTML content in the response
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// View all bookings
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('packageId');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createBooking, getBookings };
