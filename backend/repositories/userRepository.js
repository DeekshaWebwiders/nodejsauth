/**
 * userRepository.js
 * ------------------
 * Repository layer for 'users' table using Knex.
 * Provides reusable CRUD methods with dynamic WHERE conditions.
*/

const db = require('../config/db');            
const User = require('../models/userModel');   

class UserRepository {
  /**
   * Create a new user record.
   * @param {Object} userData - User data to insert
   * @returns {Object} - Inserted user data with ID
  */
  async create(userData) {
    try {
      const [id] = await db(User.tableName).insert(userData);
      return { id, ...userData };
    } catch (err) {
      return sendError(res,{}, {}, 'Internal server error');
    }
  }

  /**
   * Find a single user matching the condition.
   * @param {Object} condition - WHERE condition (e.g., { email: 'test@example.com' })
   * @returns {Object|null} - User data or null if not found
  */
  async findOne(condition) {
    try {
      return await db(User.tableName).where(condition).first();
    } catch (err) {
      return sendError(res,{}, {}, 'Internal server error');
    }
  }

  /**
   * Find all users matching the condition.
   * @param {Object} [condition={}] - Optional WHERE condition
   * @returns {Array<Object>} - List of users
  */
  async findAll(condition = {}) {
    try {
      return await db(User.tableName).where(condition);
    } catch (err) {
      return sendError(res,{}, {}, 'Internal server error');
    }
  }

  /**
   * Update users based on a condition.
   * @param {Object} condition - WHERE clause (e.g., { id: 1 })
   * @param {Object} updateData - Fields to update (e.g., { name: 'New Name' })
   * @returns {Number} - Number of rows updated
  */
  async update(condition, updateData) {
    try {
      return await db(User.tableName).where(condition).update(updateData);
    } catch (err) {
      return sendError(res,{}, {}, 'Internal server error');
    }
  }

  /**
   * Delete users based on a condition.
   * @param {Object} condition - WHERE clause (e.g., { email: 'test@example.com' })
   * @returns {Number} - Number of rows deleted
  */
  async delete(condition) {
    try {
      return await db(User.tableName).where(condition).del();
    } catch (err) {
      return sendError(res,{}, {}, 'Internal server error');
    }
  }
}

module.exports = new UserRepository();
