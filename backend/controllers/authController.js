
/**
 * authController.js
 * ------------------
 * Handles HTTP requests and calls appropriate service logic.
 */

const AuthService = require('../services/authService');
const jwt = require("jsonwebtoken");
const { sendSuccess, sendError } = require('../helpers/helper');
const nodemailer = require('nodemailer');
const { handleMulterUpload } = require('../traits/fileUploadTrait');
const UserRepository = require('../repositories/userRepository');
const parse= require('dotenv');
parse.config();

class AuthController {
  /**
   * @desc Register a new user
   * @route POST /api/auth/register
   * @access Public
  */
  async register(req, res) {
    try {
      const user = await AuthService.register(req.body);
      sendSuccess(res, user, {}, 'User registered successfully');
    } catch (err) {
      console.error('Registration error:', err);
      sendError(res, {}, {}, 'Registration failed');
    }
  }

  /**
   * @desc Login user and return token
   * @route POST /api/auth/login
   * @access Public
  */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      if (!result) return sendError(res, {}, {}, 'Invalid credentials');
      sendSuccess(res, result, {}, 'Login successful');
    } catch (err) {
      console.error('Login error:', err);
      sendError(res, {}, {}, 'Login failed');
    }
  }

  /**
   * @desc Update profile by ID
   * @route PUT /api/auth/update/:id
   * @access Private
  */
  async updateProfile(req, res) {
    try {
      const updatedUser = await AuthService.updateProfile(req.params.id, req.body);
      const user = await UserRepository.findOne({ id: req.params.id });
    
      sendSuccess(res,{ user: user || {} }, {}, 'Profile updateda successfully');
    } catch (err) {
      console.error('Update profile error:', err);
      sendError(res,{ }, {}, 'Update failed');
    }
  }

  /**
   * @desc Forgot password - reset and send via email
   * @route POST /api/auth/forgot-password
   * @access Public
  */
 async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const result = await AuthService.forgotPassword(email);

      const transporter = nodemailer.createTransport({
          service: process.env.MAIL_MAILER || 'gmail', 
          host: process.env.MAIL_HOST,
          port: parseInt(process.env.MAIL_PORT),  
          secure: process.env.MAIL_PORT === "465", 
          auth: {
              user: process.env.MAIL_USERNAME,
              pass: process.env.MAIL_PASSWORD
          }
      });

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Hello,</p>
          <p>We received a request to reset your password.your random password is ${result.newPassword}.</p>
          <p style="margin-top: 20px;">If you did not request a password reset, please ignore this email.</p>
          <p>Thank you,<br>Support Team</p>
        </div>
      `;

      const info = await transporter.sendMail({
          from: `"Support" ${process.env.MAIL_FROM_ADDRESS}`,
          to: email, 
          subject: `Reset Password`, 
          html: htmlContent,
      });
     
      sendSuccess(res, info, {}, 'Password changed successfully');
    } catch (err) {
      console.error('Forgot password error:', err);
      sendError(res, {}, {}, 'Reset failed');
    }
  }

  /**
   * @desc Change user password
   * @route POST /api/auth/change-password/:id
   * @access Private
  */
  async changePassword(req, res) {
    try {
      const userId = req.params.id;
      const { oldPassword, newPassword, confirmPassword } = req.body;

      const result = await AuthService.changePassword(userId, oldPassword, newPassword, confirmPassword);

      if (!result.success) {
        return sendError(res, {}, result.errors || {}, result.message || 'Password update failed', 422);
      }

      sendSuccess(res, {}, {}, 'Password changed successfully');
    } catch (err) {
      console.error('Change password error:', err);
      sendError(res, {}, {}, 'Password change failed');
    }
  }


  /**
   * @function resendVerification
   * @description
   * Handles resending of the email verification link to a user's registered email address.
   * 
   * Flow:
   * 1. Receives user's email in the request body.
   * 2. Checks if the user exists and whether their email is already verified.
   * 3. If not verified, generates a JWT token valid for 1 day.
   * 4. Constructs a verification URL using the token.
   * 5. Sends a verification email containing the link.
   * 
   * Requirements:
   * - UserRepository must support a `findOne` method.
   * - Email configuration should be set in environment variables:
   *   MAIL_MAILER, MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD, MAIL_FROM_ADDRESS.
   * - FRONTEND_URL and JWT_SECRET must also be defined in .env
   *
   * @param {Object} req - Express request object (expects req.body.email).
   * @param {Object} res - Express response object.
   */
  async  resendVerification(req, res) {
    try {
      const { email } = req.body;

      // Find the user
      const user = await UserRepository.findOne({ email : email });
     
      if (!user) return sendError(res, {}, {}, 'User not found');

      if (user.email_verified) {
        return sendError(res, {}, {}, 'Email already verified');
      }

      //  Generate token (valid for 1 day)
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
     
      // Create email transporter
      const transporter = nodemailer.createTransport({
        service: process.env.MAIL_MAILER || 'gmail',
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT),
        secure: process.env.MAIL_PORT === "465", 
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false, 
        },
      });

      // Verification link
      const verifyUrl = `${process.env.APP_URL}/email-verification?token=${token}`;

      // Email HTML content
      const htmlContent = `
        <div>
          <h2>Email Verification</h2>
          <p>Click the link below to verify your email:</p>
          <a href="${verifyUrl}">Verify Email</a>
        </div>
      `;

      // Send email
      const info = await transporter.sendMail({
        from: `"Support" <${process.env.MAIL_FROM_ADDRESS}>`,
        to: email,
        subject: `Email Verification`,
        html: htmlContent,
      });

      sendSuccess(res, info, {}, 'Verification email sent successfully');
    } catch (err) {
      console.error('Email verification error:', err);
      sendError(res, {}, {}, 'Email verification failed');
    }
  }


  /**
   * @function verifyEmail
   * @description
   * Verifies the JWT token from the email link and updates the user's email_verified field with the current timestamp.
   * Then redirects to dashboard.
   *
   * @route GET /auth/verify-email?token=XYZ
   * @param {Object} req - Express request object (expects query.token)
   * @param {Object} res - Express response object
   */
  async  verifyEmail(req, res) {
    try {
      const { token } = req.query;

      if (!token) {
        return sendError(res, {}, {}, "Invalid verification link.");
      }

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { email } = decoded;

      // Find user
      const user = await UserRepository.findOne({ email });
      if (!user) {
        return sendError(res, {}, {}, "User not found.");
      }

      // If already verified
      if (user.email_verified) {
        return sendSuccess(res, { user }, {}, "Email already verified.");
      }

      // Update email_verified to now
      await UserRepository.update({ email }, { email_verified: new Date() });

      // Fetch updated user
      const updatedUser = await UserRepository.findOne({ email });

      return sendSuccess(res, { user: updatedUser }, {}, "Email verified successfully.");
    } catch (err) {
      console.error("Email verification failed:", err);
      return sendError(res, {}, {}, "Email verification failed.");
    }
  }

  /**
   * @desc    Fetch user data by user ID
   * @route   GET /auth/user/:id
   * @access  Public (⚠️ Use with caution — ID-based fetch is not secure for protected data)
   *
   * This controller handles retrieving a user's data from the database using the user ID
   * provided in the route parameter. It is typically used when the frontend already has
   * access to the user's ID (e.g., from localStorage).
   *
   * Steps:
   * 1. Validate that the user ID is provided.
   * 2. Look up the user in the database by ID.
   * 3. If found, return user data with a success message.
   * 4. If not found or an error occurs, return appropriate error messages.
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async  userDataById(req, res) {
    try {
      const userId = req.params.id;

      if (!userId) {
        return sendError(res, {}, {}, "User ID is required");
      }

      const user = await UserRepository.findById(userId);

      if (!user) {
        return sendError(res, {}, {}, "User not found");
      }

      return sendSuccess(res, { user }, {}, "User data fetched successfully");
    } catch (err) {
      console.error("Error in userDataById:", err);
    }
  }

}



module.exports = new AuthController();
=======
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  const { name, email, password, mobile, gender } = req.body;
  const profilePicture = req.file?.filename;

  try {
    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [id] = await db('users').insert({
      name,
      email,
      password: hashedPassword,
      mobile,
      gender,
      profile_picture: profilePicture
    });

    res.status(201).json({ message: 'User registered successfully', userId: id });
  } catch (err) {
    res.status(500).json({ message: 'Registration error', error: err.message });
  }
};



exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db('users').where({ email }).first();
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};


exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
 
  try {
    console.log("hello");
    // Check if user exists
    const user = await db('users').where({ email }).first();
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Generate random 6-digit password
    const newPasswordPlain = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash the password
    const hashedPassword = await bcrypt.hash(newPasswordPlain, 10);

    // Update password in DB
    await db('users').where({ id: user.id }).update({ password: hashedPassword });

    // Return plain password (normally you'd email this)
    res.json({
      message: 'New password generated and updated.',
      newPassword: newPasswordPlain
    });
  } catch (err) {
    console.log("hii");
    res.status(500).json({ message: 'Error resetting password', error: err.message });
  }
};
>>>>>>> 42eeb882a606e9ec3e1ab5bbd803132712d23fe9

