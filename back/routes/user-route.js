const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const userController = require('../controllers/user-controller');

// สร้างเส้นทางสำหรับสร้างผู้ใช้ใหม่
router.post('/users', userController.createUser);

// สร้างเส้นทางสำหรับดึงข้อมูลของผู้ใช้ทั้งหมด
router.get('/users',  userController.getAllUsers);

// สร้างเส้นทางสำหรับดึงข้อมูลของผู้ใช้โดยใช้ ID
router.get('/users/:id',  userController.getUserById);

// สร้างเส้นทางสำหรับอัปเดตข้อมูลของผู้ใช้โดยใช้ ID
router.put('/users/:id', authenticate, userController.updateUserById);

// สร้างเส้นทางสำหรับลบผู้ใช้โดยใช้ ID
router.delete('/users/:id', userController.deleteUserById);

module.exports = router;
