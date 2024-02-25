const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const orderController = require('../controllers/order-controller');

// สร้างเส้นทางสำหรับสร้าง Order
router.post('/orders', authenticate, orderController.createOrder);

// สร้างเส้นทางสำหรับดึงข้อมูล Order ทั้งหมด
router.get('/orders', orderController.getAllOrders);

// สร้างเส้นทางสำหรับดึงข้อมูล Order ตาม ID
router.get('/orders/:id', orderController.getOrderById);

// สร้างเส้นทางสำหรับอัปเดตข้อมูล Order ตาม ID
router.put('/orders/:id', orderController.updateOrderById);

// สร้างเส้นทางสำหรับลบ Order ตาม ID
router.delete('/orders/:id', orderController.deleteOrderById);

module.exports = router;
