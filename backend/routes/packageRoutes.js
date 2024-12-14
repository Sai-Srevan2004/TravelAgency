const express = require('express');
const { getPackages, getPackageById, addPackage, updatePackage, deletePackage } = require('../controllers/packageController');
const authMiddleware = require('../middlewares/Auth');

const router = express.Router();

router.get('/', getPackages);
router.get('/:id', getPackageById);
router.post('/', authMiddleware, addPackage);
router.put('/:id', authMiddleware, updatePackage);
router.delete('/:id', authMiddleware, deletePackage);

module.exports = router;
