const express = require('express');
const router = express.Router();
const {authenticate, authorizeRoles}=require('../middlewares/Auth')
const {
  createBooking,
  getAllBookings,
  getBookingById,
  getUserBookings
} = require('../controllers/bookingController'); // Update path if needed

router.post('/',authenticate, createBooking);
router.get('/',authenticate, getAllBookings);
router.get('/:id',authenticate, getBookingById);
router.get('/users/:userId',authenticate, getUserBookings); // Get bookings for a specific user


module.exports = router;
