/**
 * categoryController.js
 * -----------------------
 * Handles HTTP requests for category routes.
 */

const CategoryService = require('../services/categoryService');
const { sendSuccess, sendError } = require('../helpers/helper');

exports.create = async (req, res) => {
  try {
    const result = await CategoryService.createCategory(req.body);
    sendSuccess(res, result, {}, 'Category created successfully');
  } catch (err) {
    console.error('Create category error:', err);
    sendError(res, {}, {}, 'Failed to create category');
  }
};

exports.list = async (req, res) => {
  try {
    const result = await CategoryService.listCategories();
    sendSuccess(res, result, {}, 'Category list fetched');
  } catch (err) {
    console.error('List categories error:', err);
    sendError(res, {}, {}, 'Failed to fetch categories');
  }
};

exports.update = async (req, res) => {
  try {
    const result = await CategoryService.updateCategory(req.params.id, req.body);
    sendSuccess(res, result, {}, 'Category updated');
  } catch (err) {
    console.error('Update category error:', err);
    sendError(res, {}, {}, 'Failed to update category');
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await CategoryService.deleteCategory(req.params.id);
    sendSuccess(res, result, {}, 'Category deleted');
  } catch (err) {
    console.error('Delete category error:', err);
    sendError(res, {}, {}, 'Failed to delete category');
  }
};
