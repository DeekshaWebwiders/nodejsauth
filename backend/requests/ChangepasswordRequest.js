const Joi = require('joi');
const { sendError } = require('../helpers/helper');

const ChangePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().messages({
    'string.empty': 'Old password is required',
  }),
  newPassword: Joi.string().min(6).required().messages({
    'string.empty': 'New password is required',
    'string.min': 'New password must be at least 6 characters',
  }),
  confirmPassword: Joi.any().valid(Joi.ref('newPassword')).required().messages({
    'any.only': 'Confirm password must match new password',
    'any.required': 'Confirm password is required',
  }),
});

module.exports = async (req, res, next) => {
  const { error } = ChangePasswordSchema.validate(req.body, { abortEarly: false });

  const errors = {};

  if (error) {
    error.details.forEach((detail) => {
      const field = detail.path[0];
      errors[field] = detail.message;
    });

    return sendError(res, {}, errors, 'Validation error', 422);
  }

  next();
};
