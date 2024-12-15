const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate user and validate roles
const authenticate = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication token missing.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Attach user data to the request object
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

const authorizeRoles = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // Get user data from token

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (req.user.role!=="admin") {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    next();
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { authenticate, authorizeRoles };
