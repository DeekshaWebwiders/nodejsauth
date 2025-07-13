/**
 * authService.js
 * ----------------
 * Business logic for user authentication and profile management.
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/userRepository');
require('dotenv').config();
const { sendError , sendSuccess } = require('../helpers/helper'); 
const nodemailer = require('nodemailer');

class AuthService {
  /**
   * Register a new user with hashed password.
   * @param {Object} userData - User details (name, email, password, etc.)
   * @returns {Object} - Created user record
  */
  async register(userData) {
    try {
      const { confirmPassword, ...dataToSave } = userData; // Remove confirmPassword
      const hashedPassword = await bcrypt.hash(dataToSave.password, 10);
      return await UserRepository.create({ ...dataToSave, password: hashedPassword });
    } catch (err) {
      return sendError(res,{}, {}, 'Internal server error');
    }
  }

  /**
   * Authenticate user and return JWT token.
   * @param {string} email - User email
   * @param {string} password - Plain password
   * @returns {Object|null} - { token } or null if invalid credentials
  */
  async login(email, password) {
    try {
      const user = await UserRepository.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return null;
      }

      const { password: pwd, ...userData } = user;
      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return { token };
    } catch (err) {
      return sendError(res,{}, {}, 'Internal server error');
    }
  }

  /**
   * Update user profile.
   * @param {number} userId - User ID
   * @param {Object} data - Fields to update
   * @returns {boolean} - true if updated
  */
  async updateProfile(userId, data) {
    return await UserRepository.update({ id: userId }, data);
  }

  /**
   * Handle forgot password: generate and update a new password.
   * @param {string} email - Email to reset password for
   * @returns {Object|null} - { user, newPassword } or null if not found
  */
  async forgotPassword(email) {
    try {
      const user = await UserRepository.findOne({ email });
      if (!user) return null;

      const newPassword = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await UserRepository.update({ email }, { password: hashedPassword });

      return { user, newPassword };
    } catch (err) {
      return sendError(res,{}, {}, 'Internal server error');
    }
  }

  /**
   * @desc Handles user password change request.
   *       Validates old password, matches new and confirm password,
   *       and updates the user's password in the database.
   *
   * @route POST /api/auth/change-password/:id
   * @access Private (requires authentication)
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} JSON response with success or error message
  */
  async changePassword(userId, oldPassword, newPassword, confirmPassword) {
    try {
      const user = await UserRepository.findOne({ id: userId });

      if (!user) {
        return { success: false, message: 'User not found' };
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return { success: false, errors: { oldPassword: 'Old password is incorrect' } };
      }

      if (newPassword !== confirmPassword) {
        return { success: false, errors: { confirmPassword: 'New and confirm passwords do not match' } };
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await UserRepository.update({ id: userId }, { password: hashedPassword });


      return { success: true };
    } catch (err) {
      return sendError(res,{}, {}, 'Internal server error');
    }
  }

}

module.exports = new AuthService();
