const express = require('express');
const router = express.Router();

const { validateBody } = require('../middlewares');
const { clientSchemas } = require('../schemas');
const { clientsControllers } = require('../controllers');
const { authenticate } = require('../middlewares');

router.get('/', authenticate, clientsControllers.getAll);

router.get('/:taxNumber', authenticate, clientsControllers.getByTaxNumber);

router.post(
  '/create',
  validateBody(clientSchemas.clientSchema),
  authenticate,
  clientsControllers.create
);

module.exports = router;
