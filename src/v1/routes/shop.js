const express = require('express');
const shopSchema = require('../validations/shopSchema');
const shopController = require('../controllers/shopController')
const validate = require('../middleware/validation');
const router = express.Router();

// ,validate.body(shopSchema.createShop)
router.post('/create-shop', shopController.handle_create_shop);

router.get('/list-member', shopController.get_all_member);

router.post('/create-member',  shopController.handle_create_member);

router.post('/edit-member', shopController.handle_edit_member);

// router.delete('/delete-member',validate.query(shopSchema.deleteMember), shopController.handle_delete_member);

router.post('/create-product', shopController.handle_create_product);

// router.put('/edit-product',validate.body(shopSchema.editProduct),shopController.handle_edit_product);

// router.delete('/delete-product', validate.query(shopSchema.deleteProduct), shopController.handle_delete_product);

router.post('/create-collection', shopController.handle_create_collection);

router.get('/sales', shopController.handle_get_sales);

// router.put('/edit-collection', validate.body(shopSchema.editCol), shopController.handle_edit_col);

// router.delete('/delete-collection',validate.query(shopSchema.deleteCol), shopController.handle_delete_col);

router.get('/top-sale', shopController.get_top_sale);

router.get('/verify-invite', shopController.post_verify_invite);

// router.get('/search', validate.query(shopSchema.Allcode), shopController.handle_search);

module.exports = router;