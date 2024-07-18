const mongoose = require('mongoose');

const priceHistorySchema = new mongoose.Schema(
  {
    estimatedPrice: {
      type: Number,
      // required: true,
    },
    commission: {
      type: Number,
      // required: true,
      min: 5,
    },
    changeDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      minLength: 2,
      // match: /^[A-Za-z0-9'\\s-]{2,}$/,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'jewelry',
        'electronics',
        'watches',
        'tools',
        'musical_instruments',
        'sporting_goods',
        'luxury_items',
        'collectibles',
        'household_items',
        'miscellaneous',
      ],
    },
    description: {
      type: String,
      required: true,
      minLength: 2,
    },
    estimatedPrice: {
      type: Number,
      required: true,
    },
    commission: {
      type: Number,
      required: true,
      min: 5,
    },
    priceHistory: [priceHistorySchema],
    dateOfAcceptance: {
      type: Date,
      required: true,
    },
    dateValidUntil: {
      type: Date,
      required: true,
    },
    pawnUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'client',
      required: true,
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Item = mongoose.model('item', itemSchema);

module.exports = Item;
