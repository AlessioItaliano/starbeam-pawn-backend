const { Item } = require('../models');

const getAllGoods = async () => {
  const result = await Item.find({}, '-createdAt -updatedAt').exec();
  return result;
};

// const getAllGoods = async () => {
//   const result = await Item.find({}, '-createdAt -updatedAt').exec();
//   return result;
// };

module.exports = {
  getAllGoods,
};
