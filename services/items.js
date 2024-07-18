const { Item } = require('../models');
const { HttpError } = require('../helpers');

const getAll = async () => {
  const result = await Item.find({ archived: false }, '-createdAt -updatedAt')
    .populate('pawnUser', 'firstName lastName patronymic')
    .populate('clientId', 'firstName lastName patronymic');

  return result;
};

// const create = async (user, body) => {
//   const result = await Item.create({ pawnUser: user._id, ...body });

//   result.priceHistory.push(priceHistoryEntry);
//   result.estimatedPrice = newPrice;
//   result.commission = newCommission;

//   await result.save();
//   //   return item;
//   return result;
// };

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
      // estimatedPrice: body.estimatedPrice,
      // commission: body.commission,
    },
    { new: true }
  )
    .populate('pawnUser', 'firstName lastName patronymic')
    .populate('clientId', 'firstName lastName patronymic');

  if (!result) {
    throw new HttpError('Not found');
  }

  return result;
};

// const updateItemPriceAndCommission = async (
//   itemId,
//   newPrice,
//   newCommission
// ) => {
//   const item = await Item.findById(itemId);
//   if (!item) {
//     throw new Error('Item not found');
//   }

//   const priceHistoryEntry = {
//     estimatedPrice: item.estimatedPrice,
//     commission: item.commission,
//     changeDate: new Date(),
//   };

//   item.priceHistory.push(priceHistoryEntry);
//   item.estimatedPrice = newPrice;
//   item.commission = newCommission;

//   await item.save();
//   return item;
// };

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
