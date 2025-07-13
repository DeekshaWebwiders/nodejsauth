const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

// List categories
router.get('/', categoryController.list);

// Create a category
router.post('/', categoryController.create);

// Update a category
router.put('/:id', categoryController.update);

// Delete a category
router.delete('/:id', categoryController.remove);

module.exports = router;
