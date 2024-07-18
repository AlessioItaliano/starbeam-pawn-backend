const Joi = require('joi');

const passportSchema = Joi.object({
  passportSerie: Joi.string()
    .pattern(/^[A-Z]{2}$/)
    .required()
    .messages({
      'string.base': 'Passport series should be a string',
      'string.pattern.base':
        'Passport series must consist of exactly 2 uppercase letters',
      'any.required': 'Passport series is required',
    }),
  passportNumber: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required()
    .messages({
      'string.base': 'Passport number should be a string',
      'string.pattern.base': 'Passport number must consist of exactly 6 digits',
      'any.required': 'Passport number is required',
    }),
  passportDateOfIssue: Joi.date().required().messages({
    'date.base': 'Passport date of issue should be a valid date',
    'any.required': 'Passport date of issue is required',
  }),
});

const clientSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[A-Za-z\u0400-\u04FF'-]{2,}$/)
    .required()
    .messages({
      'string.base': 'First name should be a string',
      'string.pattern.base': 'First name must consist of at least 2 letters',
      'any.required': 'First name is required',
    }),
  lastName: Joi.string()
    .pattern(/^[A-Za-z\u0400-\u04FF'-]{2,}$/)
    .required()
    .messages({
      'string.base': 'Last name should be a string',
      'string.pattern.base': 'Last name must consist of at least 2 letters',
      'any.required': 'Last name is required',
    }),
  patronymic: Joi.string()
    .pattern(/^[A-Za-z\u0400-\u04FF'-]{2,}$/)
    .required()
    .messages({
      'string.base': 'Patronymic should be a string',
      'string.pattern.base': 'Patronymic must consist of at least 2 letters',
      'any.required': 'Patronymic is required',
    }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.base': 'Phone should be a string',
      'string.pattern.base': 'Phone must consist of exactly 10 digits',
      'any.required': 'Phone is required',
    }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  taxNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.base': 'Tax number should be a string',
      'string.pattern.base': 'Tax number must consist of exactly 10 digits',
      'any.required': 'Tax number is required',
    }),
  passport: passportSchema.required().messages({
    'any.required': 'Passport information is required',
  }),
});

module.exports = { clientSchema };
