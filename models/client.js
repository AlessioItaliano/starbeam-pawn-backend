const mongoose = require('mongoose');

const passportSchema = new mongoose.Schema(
  {
    passportSerie: {
      type: String,
      required: true,
      match: /^[A-Z]{2}$/,
    },
    passportNumber: {
      type: String,
      required: true,
      match: /^[0-9]{6}$/,
    },
    passportDateOfIssue: {
      type: Date,
      required: true,
    },
  },
  { _id: false }
);

const clientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      match: /^[A-Za-z\u0400-\u04FF'-]{2,}$/,
    },
    lastName: {
      type: String,
      required: true,
      match: /^[A-Za-z\u0400-\u04FF'-]{2,}$/,
    },
    patronymic: {
      type: String,
      required: true,
      match: /^[A-Za-z\u0400-\u04FF'-]{2,}$/,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    email: {
      type: String,
      required: true,
    },
    taxNumber: {
      type: Number,
      required: true,
      unique: true,
      match: /^[0-9]{10}$/,
    },
    passport: {
      type: passportSchema,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Client = mongoose.model('client', clientSchema);

module.exports = Client;
