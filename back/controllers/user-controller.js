const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

exports.createUser = async (req, res, next) => {
  const { role, firstName, lastName, phoneNumber, gender, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        role,
        firstName,
        lastName,
        phoneNumber,
        gender,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

exports.updateUserById = async (req, res, next) => {
  const userId = req.params.id;
  const { role, firstName, lastName, phoneNumber, gender, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        role,
        firstName,
        lastName,
        phoneNumber,
        gender,
        email,
        password: hashedPassword,
      },
    });
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
};

exports.deleteUserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
