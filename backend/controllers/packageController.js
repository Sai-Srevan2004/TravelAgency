const Package = require('../models/Package');

// Get all packages
const getPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single package by ID
const getPackageById = async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id);
        if (!pkg) return res.status(404).json({ error: "Package not found" });
        res.json(pkg);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new package
const addPackage = async (req, res) => {
    try {
        const pkg = new Package(req.body);
        await pkg.save();
        res.status(201).json(pkg);
    } catch (err) {
        res.status(400).json({ error: err.message });
        console.log(error.message)
    }
};

// Update a package
const updatePackage = async (req, res) => {
    try {
        const updated = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: "Package not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a package
const deletePackage = async (req, res) => {
    try {
        const deleted = await Package.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Package not found" });
        res.json({ message: "Package deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getPackages, getPackageById, addPackage, updatePackage, deletePackage };
