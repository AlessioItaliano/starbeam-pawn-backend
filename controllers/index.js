const authController = require('./auth');
const clientsControllers = require('./clients');
const itemsControllers = require('./items');

module.exports = {
  itemsControllers,
  authController,
  clientsControllers,
};
