const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart-controller');

// สร้างเส้นทางสำหรับสร้าง cart ใหม่
router.post('/carts', cartController.createCart);

// สร้างเส้นทางสำหรับดึงข้อมูล cart ทั้งหมด
router.get('/carts', cartController.getAllCarts);

// สร้างเส้นทางสำหรับดึงข้อมูล cart โดยใช้ ID
router.get('/carts/:id', cartController.getCartById);

// สร้างเส้นทางสำหรับอัปเดตข้อมูล cart โดยใช้ ID
router.put('/carts/:id', cartController.updateCartById);

// สร้างเส้นทางสำหรับลบ cart โดยใช้ ID
router.delete('/carts/:id', cartController.deleteCartById);

module.exports = router;
