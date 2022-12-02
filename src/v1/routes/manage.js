// const express = require('express');
// const manageSchema = require('../validations/manageSchema');
// const manageControler = require('../controllers/manageControler')
// const validate = require('../middleware/validation');
// const router = express.Router();

// router.get('/user',validate.get(manageSchema.getUser), manageControler.handle_get_user);

// router.post('/create-user',validate.body(manageSchema.createUser), manageControler.handle_create_user);

// router.put('/edit-user', validate.body(manageSchema.editUser), manageControler.handle_edit_user);

// router.delete('/delete-user',validate.body(manageSchema.deleteUser), manageControler.handle_deleteUser);

// router.delete('/delete-shop',validate.query(manageSchema.deleteShop), manageControler.handle_delete_shop);

// router.post('/create-shop', validate.body(manageSchema.createShop), manageControler.handle_create_shop);

// router.post('/create-group-product',validate.body(manageSchema.create_group_product),manageControler.handle_create_gproduct);

// router.delete('/delete-group-product', validate.query(manageSchema.delete_group_product), manageControler.handle_delete_gproduct);

// router.put('/edit-group-product',validate.body(manageSchema.edit_group_product), manageControler.handle_edit_gproduct);

// router.put('/edit-collection', validate.body(manageSchema.editCol), manageControler.handle_edit_col);

// router.get('/statistical-shop',validate.query(manageSchema.get_statistical_shop), manageControler.handle_get_statistical_shop);

// router.get('/statistical-user',validate.query(manageSchema.get_statistical_user), manageControler.handle_get_statistical_user);

// router.get('/statistical-product', validate.query(manageSchema.getBuyer), manageControler.handle_get_statistical_product);

// router.get('/search', validate.query(manageSchema.search), manageControler.handle_search);

// export default router;