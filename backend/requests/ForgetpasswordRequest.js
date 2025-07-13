const Joi = require('joi');
const { sendError } = require('../helpers/helper'); 

const LoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Invalid email format',
  })
});

module.exports = async (req, res, next) => {
  const { error } = LoginSchema.validate(req.body, { abortEarly: false });

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
