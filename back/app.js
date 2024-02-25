const express = require('express');
const cors = require('cors');
const notFound = require('./middlewares/notFound');
const errorMiddleware = require('./middlewares/error');
const authRoute = require('./routes/auth-route');
const userRoute = require('./routes/user-route'); // เพิ่มการนำเข้าเส้นทางของผู้ใช้
const shippingAddressRoute = require('./routes/shipping-address-route'); // เพิ่มการนำเข้าเส้นทางของ Shipping Address
const cartRoute = require('./routes/cart-route');
const cartProductRoute = require('./routes/cart-product-route');
const pizzaRoute = require('./routes/pizza-route');
const orderProductRoute = require('./routes/order-product-route');
const orderRoute = require('./routes/order-route');
const paymentRoute = require('./routes/payment-route');


require('dotenv').config(); // เรียกใช้ dotenv

const app = express();

app.use(cors());
app.use(express.json());

// service
app.use('/auth', authRoute); // เส้นทางของระบบการยืนยันตัวตน
app.use(userRoute); // เส้นทางของข้อมูลผู้ใช้
app.use(shippingAddressRoute); 
app.use(cartRoute); 
app.use(cartProductRoute); // เส้นทางของรายการสินค้าในตะกร้า
app.use(pizzaRoute);
app.use(orderProductRoute);
app.use(orderRoute);
app.use(paymentRoute);


// notFound
app.use(notFound);

// error
app.use(errorMiddleware);

let port = process.env.PORT || 8000;
app.listen(port, () => console.log('Server on Port:', port));
