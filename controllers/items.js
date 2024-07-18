const { ctrlWrapper } = require('../helpers');
const { itemsServices } = require('../services');

const getAll = async (_, res) => {
  const result = await itemsServices.getAll();
  res.status(200).json(result);
};

const create = async (req, res) => {
  const result = await itemsServices.create(req.user, req.body);
  res.status(200).json(result);
};

const changePrice = async (req, res) => {
  const result = await itemsServices.changeItemPrice(req.params.id, req.body);
  res.status(200).json(result);
};

const getArchive = async (_, res) => {
  const result = await itemsServices.getArchiveItems();
  res.status(200).json(result);
};

const moveToArchive = async (req, res) => {
  const result = await itemsServices.moveToArchiveItems(req.params.id);
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  create: ctrlWrapper(create),
  changePrice: ctrlWrapper(changePrice),
  getArchive: ctrlWrapper(getArchive),
  moveToArchive: ctrlWrapper(moveToArchive),
};
