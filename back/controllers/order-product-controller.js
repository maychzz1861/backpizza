const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.createOrderProduct = async (req, res, next) => {
  const { qunatity, orderId, pizzaId } = req.body;
  try {
    const orderProduct = await prisma.order_product.create({
      data: {
        qunatity:  qunatity, // แก้จาก quantity เป็น qunatity
        orderId: orderId, // เปลี่ยนจาก Object ให้ใช้ค่า orderId ที่เป็น Int
        pizzaId: pizzaId
      }
    });
    res.status(201).json({ orderProduct });
  } catch (error) {
    next(error);
  }
};
;

exports.getOrderProducts = async (req, res, next) => {
  try {
    const orderProducts = await prisma.order_product.findMany();
    res.status(200).json({ orderProducts });
  } catch (error) {
    next(error);
  }
};

exports.updateOrderProduct = async (req, res, next) => {
  const { id } = req.params;
  const { qunatity, orderId, pizzaId } = req.body;
  try {
    const updatedOrderProduct = await prisma.order_product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        qunatity,
        orderId,
        pizzaId
      },
    });
    res.status(200).json({ orderProduct: updatedOrderProduct });
  } catch (error) {
    next(error);
  }
};

exports.deleteOrderProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.order_product.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
