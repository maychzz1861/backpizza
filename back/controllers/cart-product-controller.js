const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createCartProduct = async (req, res, next) => {
  const { quantity, pizzaId, cartId } = req.body;
  try {
    const cartProduct = await prisma.cart_product.create({
      data: {
        quantity,
        pizza: { connect: { id: pizzaId } },
        cart: { connect: { id: cartId } },
      },
    });
    res.status(201).json({ cartProduct });
  } catch (error) {
    next(error);
  }
};


exports.getAllCartProducts = async (req, res, next) => {
  try {
    const cartProducts = await prisma.cart_product.findMany(); 
    res.status(200).json({ cartProducts });
  } catch (error) {
    next(error);
  }
};


exports.getCartProductById = async (req, res, next) => {
  const cartProductId = req.params.id;
  try {
    const cartProduct = await prisma.cart_product.findUnique({
      where: { id: parseInt(cartProductId) },
    });
    if (!cartProduct) {
      return res.status(404).json({ message: "Cart product not found" });
    }
    res.status(200).json({ cartProduct });
  } catch (error) {
    next(error);
  }
};

exports.updateCartProductById = async (req, res, next) => {
  const cartProductId = req.params.id;
  const { quantity, pizzaId, cartId } = req.body;
  try {
    const updatedCartProduct = await prisma.cart_product.update({
      where: {
        id: parseInt(cartProductId),
      },
      data: {
        quantity,
        pizza: { connect: { id: pizzaId } },
        cart: { connect: { id: cartId } },
      },
    });
    res.status(200).json({ cartProduct: updatedCartProduct });
  } catch (error) {
    next(error);
  }
};


exports.deleteCartProductById = async (req, res, next) => {
  const cartProductId = req.params.id;
  try {
    await prisma.cart_product.delete({
      where: {
        id: parseInt(cartProductId),
      },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
