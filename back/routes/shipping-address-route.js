const express = require('express');
const router = express.Router();
const shippingAddressController = require('../controllers/shipping-address-controller');
const authenticate = require('../middlewares/authenticate');

// สร้างเส้นทางสำหรับสร้าง Shipping Address
router.post('/shipping-addresses', authenticate, shippingAddressController.createShippingAddress);

// สร้างเส้นทางสำหรับดึงข้อมูลทั้งหมดของ Shipping Address
router.get('/shipping-addresses', shippingAddressController.getAllShippingAddresses);

// สร้างเส้นทางสำหรับดึงข้อมูลของ Shipping Address โดยใช้ ID
router.get('/shipping-addresses/:id', shippingAddressController.getShippingAddressById);

// สร้างเส้นทางสำหรับอัปเดตข้อมูลของ Shipping Address โดยใช้ ID
router.put('/shipping-addresses/:id', shippingAddressController.updateShippingAddressById);

// สร้างเส้นทางสำหรับลบ Shipping Address โดยใช้ ID
router.delete('/shipping-addresses/:id', shippingAddressController.deleteShippingAddressById);

module.exports = router;
