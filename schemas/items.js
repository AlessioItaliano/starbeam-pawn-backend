const Joi = require('joi');

const historyPriceSchema = Joi.object({
  estimatedPrice: Joi.number().messages({
    'number.base': 'Estimated price must be a number.',
    // 'number.empty': 'Estimated price is required.',
  }),
  commission: Joi.number().min(5).messages({
    'number.base': 'Commission must be a number.',
    'number.min': 'Commission must be at least 5.',
    // 'number.empty': 'Commission is required.',
  }),
  changeDate: Joi.date(),
});

const itemSchema = Joi.object({
  itemName: Joi.string().min(2).required().messages({
    'string.empty': 'Item name is required.',
    'string.min': 'Item name must have at least 2 characters.',
  }),
  category: Joi.string()
    .valid(
      'jewelry',
      'electronics',
      'watches',
      'tools',
      'musical_instruments',
      'sporting_goods',
      'luxury_items',
      'collectibles',
      'household_items',
      'miscellaneous'
    )
    .required()
    .messages({
      'any.only': 'Category must be one of the allowed values.',
      'string.empty': 'Category is required.',
    }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required.',
  }),
  estimatedPrice: Joi.number().required().messages({
    'number.base': 'Estimated price must be a number.',
    'number.empty': 'Estimated price is required.',
  }),
  commission: Joi.number().min(5).required().messages({
    'number.base': 'Commission must be a number.',
    'number.min': 'Commission must be at least 5.',
    'number.empty': 'Commission is required.',
  }),
  dateOfAcceptance: Joi.date().required(),
  dateValidUntil: Joi.date().required().messages({
    'date.base': 'Date valid until must be a valid date.',
    'date.empty': 'Date valid until is required.',
  }),
  clientId: Joi.string().required(),
  archived: Joi.boolean().default(false),
  priceHistory: historyPriceSchema.messages({
    // 'any.required': 'Price history information is required',
  }),
});

const updatePriceSchema = Joi.object({
  estimatedPrice: Joi.number().required().messages({
    'number.base': 'Estimated price must be a number.',
    'number.empty': 'Estimated price is required.',
  }),
  commission: Joi.number().min(5).required().messages({
    'number.base': 'Commission must be a number.',
    'number.min': 'Commission must be at least 5.',
    'number.empty': 'Commission is required.',
  }),
});

module.exports = {
  itemSchema,
  updatePriceSchema,
  // updateArchiveSchema
};
