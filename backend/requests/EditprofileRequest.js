const Joi = require('joi');
const { sendError } = require('../helpers/helper'); 

const registrationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Invalid email format',
  }),
  mobile: Joi.string().pattern(/^\d{10}$/).required().messages({
    'string.empty': 'Mobile number is required',
    'string.pattern.base': 'Mobile number must be 10 digits',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': 'Gender must be male, female or other',
    'string.empty': 'Gender is required'
  }),

  profile_picture: Joi.string().optional(),

});

module.exports = async (req, res, next) => {
  const { error } = registrationSchema.validate(req.body, { abortEarly: false });

  const errors = {};

  // Joi validation errors
  if (error) {
    error.details.forEach((detail) => {
      const field = detail.path[0];
      errors[field] = detail.message;
    });
  }


  if (Object.keys(errors).length > 0) {
    return sendError(res, {},errors, 'Validation error', 422); 
  }

  next();
};
