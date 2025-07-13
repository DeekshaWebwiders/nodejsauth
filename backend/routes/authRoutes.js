const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateRegistration = require('../requests/RegistrationRequest');
const validateLogin  = require('../requests/LoginRequest');
const validateProfile  = require('../requests/EditprofileRequest');
const validateChangePassword  = require('../requests/ChangepasswordRequest');
const validateForgetpassword = require('../requests/ForgetpasswordRequest');
const { handleMulterUpload }   = require('../traits/fileUploadTrait');
router.post(
  '/register',
  async (req, res, next) => {
    try {
      await handleMulterUpload(req);
      next();
    } catch (err) {
      return sendError(res, {}, {}, err.message, 400);
    }
  },
  validateRegistration,
  authController.register
);
router.post('/login', validateLogin, authController.login); 
router.post('/forget-password', validateForgetpassword, authController.forgotPassword);
router.post('/resend-verification', authController.resendVerification);
router.get('/verify-email', authController.verifyEmail);
router.get("/user/:id", authController.userDataById);

router.put(
  '/update-profile/:id',
  async (req, res, next) => {
    try {
      await handleMulterUpload(req);
      next();
    } catch (err) {
      return sendError(res, {}, {}, err.message, 400);
    }
  },
  validateProfile,
  authController.updateProfile
);

router.post('/change-password/:id',  validateChangePassword, authController.changePassword);



module.exports = router;
