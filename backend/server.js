require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const packageRoutes = require('./routes/packageRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes=require('./routes/userRoutes')
const cors=require('cors')

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin:"*"
}))
app.use(express.json());

// Routes
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/user',userRoutes)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
