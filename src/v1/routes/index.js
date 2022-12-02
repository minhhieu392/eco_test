const express = require('express');
const user = require('./user');
const shop = require('./shop');
// const product = require('./product');
// const manage = require('./manage');

const router = express.Router();

router.use('/user', user);
router.use('/shop', shop);
// router.use('/product', product);
// router.use('/manage', manage);

module.exports = router;