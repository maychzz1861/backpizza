const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// สร้าง cart ใหม่
exports.createCart = async (req, res, next) => {
  const { total, userId } = req.body;
  try {
    const cart = await prisma.cart.create({
      data: {
        total,
        user: { connect: { id: userId } },
      },
    });
    res.status(201).json({ cart });
  } catch (error) {
    next(error);
  }
};

// ดึงข้อมูล cart ทั้งหมด
exports.getAllCarts = async (req, res, next) => {
  try {
    const carts = await prisma.cart.findMany();
    res.status(200).json({ carts });
  } catch (error) {
    next(error);
  }
};

// ดึงข้อมูล cart โดยใช้ ID
exports.getCartById = async (req, res, next) => {
  const cartId = req.params.id;
  try {
    const cart = await prisma.cart.findUnique({
      where: { id: parseInt(cartId) },
    });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ cart });
  } catch (error) {
    next(error);
  }
};

// อัปเดตข้อมูล cart โดยใช้ ID
exports.updateCartById = async (req, res, next) => {
  const cartId = req.params.id;
  const { total, userId } = req.body;
  try {
    const updatedCart = await prisma.cart.update({
      where: {
        id: parseInt(cartId),
      },
      data: {
        total,
        user: { connect: { id: userId } },
      },
    });
    res.status(200).json({ cart: updatedCart });
  } catch (error) {
    next(error);
  }
};

// ลบ cart โดยใช้ ID
exports.deleteCartById = async (req, res, next) => {
  const cartId = req.params.id;
  try {
    await prisma.cart.delete({
      where: {
        id: parseInt(cartId),
      },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
