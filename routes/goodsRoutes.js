const express = require('express');
const router = express.Router();

const { goodsControllers } = require('../controllers');

router.get('/', goodsControllers.getAll);

module.exports = router;
