//pizza-controller.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createPizza = async (req, res, next) => {
  const { image, name, description, crustType, size, price } = req.body;
  try {
    const pizza = await prisma.pizza.create({
      data: {
        image,
        name,
        description,
        crustType,
        size,
        price,
      },
    });
    res.status(201).json({ pizza });
  } catch (error) {
    next(error);
  }
};

exports.getAllPizzas = async (req, res, next) => {
  try {
    const pizzas = await prisma.pizza.findMany();
    res.status(200).json({ pizzas });
  } catch (error) {
    next(error);
  }
};

exports.getPizzaById = async (req, res, next) => {
  const pizzaId = req.params.id;
  try {
    const pizza = await prisma.pizza.findUnique({
      where: { id: parseInt(pizzaId) },
    });
    if (!pizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }
    res.status(200).json({ pizza });
  } catch (error) {
    next(error);
  }
};

exports.updatePizzaById = async (req, res, next) => {
  const pizzaId = req.params.id;
  const { image, name, description, crustType, size, price } = req.body;
  try {
    const updatedPizza = await prisma.pizza.update({
      where: {
        id: parseInt(pizzaId),
      },
      data: {
        image,
        name,
        description,
        crustType,
        size,
        price,
      },
    });
    res.status(200).json({ pizza: updatedPizza });
  } catch (error) {
    next(error);
  }
};

exports.deletePizzaById = async (req, res, next) => {
  const pizzaId = req.params.id;
  try {
    await prisma.pizza.delete({
      where: {
        id: parseInt(pizzaId),
      },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
