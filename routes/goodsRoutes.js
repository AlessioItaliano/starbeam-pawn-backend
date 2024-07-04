const express = require('express');

const { goodsControllers } = require('../controllers');

const router = express.Router();

router.get('/', goodsControllers.getAll);

module.exports = router;
