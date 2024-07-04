const mongoose = require('mongoose');

const goodsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Jewelry',
        'Electronics',
        'Watches',
        'Tools',
        'Musical Instruments',
        'Sporting Goods',
        'Luxury Items',
        'Collectibles',
        'Household Items',
        'Miscellaneous',
      ],
      default: 'Miscellaneous',
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    addedDate: {
      type: Date,
      required: true,
    },
    commission: {
      type: Number,
      required: true,
      min: 5,
      max: 100,
    },
    returnDate: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Item = mongoose.model('good', goodsSchema);

module.exports = Item;
