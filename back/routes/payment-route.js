const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment-controller');

// สร้างเส้นทางสำหรับสร้าง Payment ใหม่
router.post('/payments', paymentController.createPayment);

// สร้างเส้นทางสำหรับดึงข้อมูล Payment ทั้งหมด
router.get('/payments', paymentController.getAllPayments);

// สร้างเส้นทางสำหรับดึงข้อมูล Payment ตาม ID
router.get('/payments/:id', paymentController.getPaymentById);

// สร้างเส้นทางสำหรับอัปเดตข้อมูล Payment ตาม ID
router.put('/payments/:id', paymentController.updatePaymentById);

// สร้างเส้นทางสำหรับลบ Payment ตาม ID
router.delete('/payments/:id', paymentController.deletePaymentById);

module.exports = router;
