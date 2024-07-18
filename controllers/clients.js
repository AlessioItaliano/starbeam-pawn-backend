const { ctrlWrapper } = require('../helpers');
const { clientsServices } = require('../services');

const getAll = async (_, res) => {
  const result = await clientsServices.getAllClients();
  res.status(200).json(result);
};

const getByTaxNumber = async (req, res) => {
  const result = await clientsServices.getClientByTax(req.params.taxNumber);
  res.status(200).json(result);
};

const create = async (req, res) => {
  const result = await clientsServices.createClient(req.body);
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getByTaxNumber: ctrlWrapper(getByTaxNumber),
  create: ctrlWrapper(create),
};
