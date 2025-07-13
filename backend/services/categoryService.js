/**
 * categoryService.js
 * -------------------
 * Business logic for managing categories.
 */

const CategoryRepository = require('../repositories/categoryRepository');

class CategoryService {
  /**
   * Create a new category.
   * @param {Object} data - category fields
   * @returns {Object} - created category
   */
  async createCategory(data) {
    return await CategoryRepository.create(data);
  }

  /**
   * Get all categories.
   * @returns {Array<Object>} - list of categories
   */
  async listCategories() {
    return await CategoryRepository.findAll();
  }

  /**
   * Update a category by ID.
   * @param {Number} id - category ID
   * @param {Object} data - updated fields
   * @returns {Number} - affected rows
   */
  async updateCategory(id, data) {
    return await CategoryRepository.update({ id }, data);
  }

  /**
   * Delete a category by ID.
   * @param {Number} id - category ID
   * @returns {Number} - affected rows
   */
  async deleteCategory(id) {
    return await CategoryRepository.delete({ id });
  }
}

module.exports = new CategoryService();
