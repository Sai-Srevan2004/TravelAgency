const Package = require('../models/Package');

// Add a new package
const addPackage = async (req, res) => {
  try {
    console.log(req.body)
    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json({success:true,data:savedPackage});
  } catch (error) {
    console.log(error.message)
    res.status(500).json({success:false, error: 'Error adding package.' });
  }
};

// Delete a package
const deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.status(200).json({ success:true,data: 'Package deleted successfully.' });
  } catch (error) {
    res.status(500).json({success:false, error: 'Error deleting package.' });
  }
};

// Update a package
const updatePackage = async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({success:true,data:updatedPackage});
  } catch (error) {
    res.status(500).json({ success:false,error: 'Error updating package.' });
  }
};

// Get all packages
const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json({success:true,data:packages});
  } catch (error) {
    res.status(500).json({ success:false,error: 'Error fetching packages.' });
  }
};


module.exports={getAllPackages,addPackage,deletePackage,updatePackage}