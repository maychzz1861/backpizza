const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const userController = require('../controllers/auth-controller');


// สร้างเส้นทางสำหรับลงทะเบียนผู้ใช้ใหม่
router.post('/register', userController.register);

// สร้างเส้นทางสำหรับเข้าสู่ระบบ
router.post('/login', userController.login);

// สร้างเส้นทางสำหรับเรียกข้อมูลของผู้ใช้ปัจจุบัน
router.get('/me', authenticate, userController.getme);

// สร้างเส้นทางสำหรับเข้าสู่ระบบในฐานะผู้ดูแลระบบ
router.post('/admin/login', userController.adminLogin);

module.exports = router;
