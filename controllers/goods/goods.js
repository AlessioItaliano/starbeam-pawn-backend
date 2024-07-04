const { ctrlWrapper } = require('../../helpers');

const { goodsServices } = require('../..services');

const getAll = async (_, res) => {
  const result = await goodsServices.getAllGoods();
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
