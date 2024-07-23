const Joi = require('joi');

const login = Joi.object({
  email: Joi.string().min(3).email().required().messages({
    'string.base': 'Email should be a string',
    'string.min': 'Email should be at least 3 characters',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Missing required email field',
  }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{8,16}$/)
    .required()
    .messages({
      'string.base': 'Password should be a string',
      'string.pattern.base': 'Invalid password format',
      'any.required': 'Missing required password field',
    }),
});

module.exports = {
  login,
};
