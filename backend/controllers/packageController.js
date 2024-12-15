const Package = require('../models/Package');

// Get all packages
const getPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        res.json({
            success:true,
            data:packages
        });
    } catch (err) {
        res.status(500).json({ 
            success:false,
            message:err.message
        });
    }
};

// Get single package by ID
const getPackageById = async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id);
        if (!pkg) return res.status(404).json({ error: "Package not found" });
        res.json({
            success:true,
            data:pkg
        });
    } catch (err) {
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
};

// Add a new package
const addPackage = async (req, res) => {
    try {
        const pkg = new Package(req.body.packageData);
        console.log(pkg)

        await pkg.save();
        res.status(201).json({
            success:true,
            data:pkg
        });
    } catch (err) {
        res.status(400).json({ success:false,
            message:err.message});
        console.log(err.message)
    }
};

// Update a package
const updatePackage = async (req, res) => {
    try {
        const updated = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: "Package not found" });
        res.json({
            success:true,
            data:updated
        });
    } catch (err) {
        res.status(400).json({ success:false,
            message:err.message});
    }
};

// Delete a package
const deletePackage = async (req, res) => {
    try {
        const deleted = await Package.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Package not found" });
        res.json({success:true, message: "Package deleted successfully" });
    } catch (err) {
        res.status(500).json({ success:false,
            message:err.message});
    }
};

module.exports = { getPackages, getPackageById, addPackage, updatePackage, deletePackage };
