const express = require('express');
const router = express.Router();

const { authenticate, validateBody } = require('../middlewares');
const { itemsControllers } = require('../controllers');
const { itemsSchemas } = require('../schemas');

router.get('/', authenticate, itemsControllers.getAll);

router.post(
  '/create',
  validateBody(itemsSchemas.itemSchema),
  authenticate,
  itemsControllers.create
);

router.patch(
  '/price/:id',
  validateBody(itemsSchemas.updatePriceSchema),
  authenticate,
  itemsControllers.changePrice
);

router.get('/archive', authenticate, itemsControllers.getArchive);

router.patch(
  '/archive/:id',
  // validateBody(itemsSchemas.updateArchiveSchema),
  authenticate,
  itemsControllers.moveToArchive
);

// router.patch(
//   '/:contactId/favorite',
//   authenticate,
//   checkValidId,
//   validateBody(updateStatusSchema),
//   updateStatusContact
// );

module.exports = router;
