const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validateProduct = require('../requests/ProductRequest'); // optional
const { handleMulterUpload } = require('../traits/fileUploadTrait');

// List all products
router.get('/', productController.list);

// Get a product by ID (optional)
router.get('/:id', productController.show);

// Create a new product
router.post(
  '/',
  async (req, res, next) => {
    try {
      await handleMulterUpload(req); // if file/image needed
      next();
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  },
  validateProduct,
  productController.create
);

// Update product
router.put(
  '/:id',
  async (req, res, next) => {
    try {
      await handleMulterUpload(req);
      next();
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  },
  validateProduct,
  productController.update
);

// Delete product
router.delete('/:id', productController.remove);

module.exports = router;
