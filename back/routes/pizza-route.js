//pizza-route.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const pizzaController = require('../controllers/pizza-controller');

// สร้างเส้นทางสำหรับสร้าง Pizza ใหม่
router.post('/pizzas', pizzaController.createPizza);

// สร้างเส้นทางสำหรับดึงข้อมูล Pizza ทั้งหมด
router.get('/pizzas', pizzaController.getAllPizzas);

// สร้างเส้นทางสำหรับดึงข้อมูล Pizza ตาม ID
router.get('/pizzas/:id', pizzaController.getPizzaById);

// สร้างเส้นทางสำหรับอัปเดตข้อมูล Pizza ตาม ID
router.put('/pizzas/:id',  pizzaController.updatePizzaById);

// สร้างเส้นทางสำหรับลบ Pizza ตาม ID
router.delete('/pizzas/:id', pizzaController.deletePizzaById);

module.exports = router;
