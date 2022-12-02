const express = require('express');
const router = express.Router();
const userSchema = require('../validations/userSchema');
const userControler = require('../controllers/userControler');
const validate = require('../middleware/validation');

// ,validate.body(userSchema.Login)
// ,validate.body(userSchema.Login)
// , validate.query(userSchema.getProduct)
router.post('/signup',userControler.handleSignup);

router.post('/login', userControler.handleLogin);

// router.put('/logout',validate.body(userSchema.Logout), userControler.handleLogout);

router.get('/product', userControler.handle_get_prodcuct);

router.get('/shop-and-category',userControler.handle_get_all_shoporcategory);

// ,validate.query(userSchema.getCategory)

router.get('/category', userControler.handleCategory);

// router.get('/search', validate.query(userSchema.search), userControler.handle_search);

router.post('/check', userControler.handleCheck);

module.exports = router;