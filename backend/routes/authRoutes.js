const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateRegistration = require('../requests/RegistrationRequest');
const upload = require('../middleware/upload');

router.post('/register',validateRegistration, upload.single('profilePicture'), authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgetPassword);

module.exports = router;
