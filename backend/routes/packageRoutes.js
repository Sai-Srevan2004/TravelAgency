const express = require('express');
const router = express.Router();
const {authenticate, authorizeRoles}=require('../middlewares/Auth')

const {
  addPackage,
  deletePackage,
  updatePackage,
  getAllPackages,
} = require('../controllers/packageController');

// Routes for package management
router.post('/',authenticate, authorizeRoles, addPackage);           // Add a package
router.delete('/:id',authenticate, authorizeRoles, deletePackage);   // Delete a package
router.put('/:id',authenticate, authorizeRoles, updatePackage);      // Update a package
router.get('/', getAllPackages);        // Get all packages

module.exports = router;
