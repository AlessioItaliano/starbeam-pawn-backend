const mongoose = require('mongoose');
const { isURL } = require('validator');

const usersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 2,
      required: true,
    },
    lastName: {
      type: String,
      minlength: 2,
      required: true,
    },
    patronymic: {
      type: String,
      minlength: 2,
      required: true,
    },
    phone: {
      type: String,
      maxlength: 10,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: '',
    },
    userAvatar: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return isURL(v, {
            protocols: ['http', 'https'],
            require_protocol: true,
          });
        },
        message: 'Book URL must be valid URL!',
      },
    },
    positionInTheCompany: {
      type: String,
      required: true,
      enum: ['Owner', 'Financial manager', 'Customer specialist'],
      default: 'Customer specialist',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model('user', usersSchema);

module.exports = User;
