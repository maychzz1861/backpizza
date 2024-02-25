const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const orderProductController = require('../controllers/order-product-controller');

router.post('/orderProducts', orderProductController.createOrderProduct);
router.get('/orderProducts', authenticate, orderProductController.getOrderProducts);
router.put('/orderProducts/:id', authenticate, orderProductController.updateOrderProduct);
router.delete('/orderProducts/:id', authenticate, orderProductController.deleteOrderProduct);

module.exports = router;
