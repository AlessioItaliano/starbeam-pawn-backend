const { Item } = require('../models');
const { HttpError } = require('../helpers');

const getAll = async () => {
  const result = await Item.find({ archived: false }, '-createdAt -updatedAt')
    .populate('pawnUser')
    .populate('clientId');

  return result;
};

const create = async (user, body) => {
  const priceHistoryEntry = {
    estimatedPrice: body.estimatedPrice,
    commission: body.commission,
    changeDate: new Date(),
  };

  const result = await Item.create({
    pawnUser: user._id,
    ...body,
    priceHistory: [priceHistoryEntry],
  });

  return result;
};

const changeItemPrice = async (itemId, body) => {
  const priceHistoryEntry = {
    estimatedPrice: body.estimatedPrice,
    commission: body.commission,
    changeDate: new Date(),
  };

  const result = await Item.findByIdAndUpdate(
    itemId,
    {
      $push: { priceHistory: priceHistoryEntry },
      ...body,
    },
    { new: true }
  )
    .populate('pawnUser')
    .populate('clientId');

  if (!result) {
    throw new HttpError('Not found');
  }

  return result;
};

const getArchiveItems = async () => {
  const result = await Item.find(
    { archived: true },
    '-createdAt -updatedAt'
  ).populate('clientId', 'firstName lastName patronymic');

  return result;
};

const moveToArchiveItems = async id => {
  const result = await Item.findByIdAndUpdate(
    id,
    { archived: true },
    { new: true }
  ).exec();

  if (result === null) {
    throw new HttpError('Not found');
  }

  return result;
};

module.exports = {
  getAll,
  create,
  changeItemPrice,
  getArchiveItems,
  moveToArchiveItems,
};
