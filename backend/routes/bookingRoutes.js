const express = require('express');
const { createBooking, getBookings,getBookingById } = require('../controllers/bookingController');
const router = express.Router();
const Booking = require('../models/Booking');
const mongoose = require('mongoose');
const generateInvoiceHTML = require('../utils/invoiceGenerator');
const pdf = require('html-pdf');

// Generate and download invoice
router.get('/invoice/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if(!id)
        {
            return res.json("No id found!")
        }

        // Fetch booking and associated package
        const booking = await Booking.findById(id).populate('packageId');
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        // Generate invoice
        const packageDetails = booking.packageId;
        const invoiceHTML = generateInvoiceHTML(booking, packageDetails);

        // Convert HTML to PDF
        pdf.create(invoiceHTML).toStream((err, stream) => {
            if (err) {
                return res.status(500).json({ error: "PDF generation failed" });
            }
            res.setHeader('Content-Type', 'application/pdf');
            stream.pipe(res);
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', createBooking);
router.get('/', getBookings);
router.get('/:id',getBookingById)

module.exports = router;
