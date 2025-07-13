/**
 * categoryRepository.js
 * ---------------------
 * Repository layer for 'categories' table using Knex.
 * Follows class-based structure with consistent error handling.
 */

const db = require('../config/db'); // Your Knex instance
const Category = require('../models/categoryModel'); // Optional: for table name

class CategoryRepository {
  /**
   * Insert a new category
   * @param {Object} categoryData
   * @returns {Object} inserted category
   */
  async create(categoryData) {
    try {
      const [category] = await db(Category.tableName).insert(categoryData).returning('*');
      return category;
    } catch (err) {
      throw new Error('Error creating category');
    }
  }

  /**
   * Get all categories
   * @param {Object} [condition={}]
   * @returns {Array<Object>}
   */
  async findAll(condition = {}) {
    try {
      return await db(Category.tableName).where(condition);
    } catch (err) {
      throw new Error('Error fetching categories');
    }
  }

  /**
   * Get category by ID
   * @param {Number} id
   * @returns {Object|null}
   */
  async findById(id) {
    try {
      return await db(Category.tableName).where({ id }).first();
    } catch (err) {
      throw new Error('Error fetching category');
    }
  }

  /**
   * Update category by condition
   * @param {Object} condition
   * @param {Object} updateData
   * @returns {Number} updated row count
   */
  async update(condition, updateData) {
    try {
      return await db(Category.tableName).where(condition).update(updateData);
    } catch (err) {
      throw new Error('Error updating category');
    }
  }

  /**
   * Delete category by condition
   * @param {Object} condition
   * @returns {Number} deleted row count
   */
  async delete(condition) {
    try {
      return await db(Category.tableName).where(condition).del();
    } catch (err) {
      throw new Error('Error deleting category');
    }
  }
}

module.exports = new CategoryRepository();
