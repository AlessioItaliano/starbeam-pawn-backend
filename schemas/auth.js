const Joi = require('joi');

const signup = Joi.object({
  firstName: Joi.string().min(2).required().messages({
    'string.base': 'First name should be a string',
    'string.min': 'First name must be at least 2 characters',
    'any.required': 'Missing required first name field',
  }),
  lastName: Joi.string().min(2).required().messages({
    'string.base': 'Last name should be a string',
    'string.min': 'Last name must be at least 2 characters',
    'any.required': 'Missing required last name field',
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be exactly 10 digits',
      'any.required': 'Missing required phone field',
    }),
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
  token: Joi.string().default('').messages({
    'string.base': 'Token should be a string',
  }),
});

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
  signup,
  login,
};
