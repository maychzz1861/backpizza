const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const cartProductController = require('../controllers/cart-product-controller');

// Create a new cart product
router.post('/cartProducts', cartProductController.createCartProduct);

// Get all cart products
router.get('/cartProducts', cartProductController.getAllCartProducts);

// Get cart product by ID
router.get('/cartProducts/:id', cartProductController.getCartProductById);

// Update cart product by ID
router.put('/cartProducts/:id', cartProductController.updateCartProductById);

// Delete cart product by ID
router.delete('/cartProducts/:id', cartProductController.deleteCartProductById);

module.exports = router;
