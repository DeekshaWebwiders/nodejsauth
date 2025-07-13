const ProductService = require('../services/productService');
const { sendSuccess, sendError } = require('../helpers/helper');

exports.list = async (req, res) => {
  try {
    const result = await ProductService.listProducts();
    sendSuccess(res, result, {}, 'Products fetched');
  } catch (err) {
    sendError(res, {}, {}, 'Failed to fetch products');
  }
};

exports.show = async (req, res) => {
  try {
    const result = await ProductService.getProductById(req.params.id);
    sendSuccess(res, result, {}, 'Product details');
  } catch (err) {
    sendError(res, {}, {}, 'Product not found');
  }
};

exports.create = async (req, res) => {
  try {
    const result = await ProductService.createProduct(req.body);
    sendSuccess(res, result, {}, 'Product created');
  } catch (err) {
    sendError(res, {}, {}, 'Product creation failed');
  }
};

exports.update = async (req, res) => {
  try {
    const result = await ProductService.updateProduct(req.params.id, req.body);
    sendSuccess(res, result, {}, 'Product updated');
  } catch (err) {
    sendError(res, {}, {}, 'Update failed');
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await ProductService.deleteProduct(req.params.id);
    sendSuccess(res, result, {}, 'Product deleted');
  } catch (err) {
    sendError(res, {}, {}, 'Delete failed');
  }
};
