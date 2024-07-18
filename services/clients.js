const { Client } = require('../models');
const { HttpError } = require('../helpers');

const getAllClients = async () => {
  const result = await Client.find({}, '-createdAt -updatedAt').exec();
  return result;
};

const getClientByTax = async number => {
  const result = await Client.findOne(
    { taxNumber: number },
    '-createdAt -updatedAt'
  ).exec();
  return result;
};

const createClient = async body => {
  const client = await Client.findOne({ taxNumber: body.taxNumber }).exec();

  if (client) {
    throw new HttpError(409, 'This client is already exist');
  }

  const newClient = await Client.create({ ...body });

  return newClient;
};

module.exports = {
  getAllClients,
  getClientByTax,
  createClient,
};
