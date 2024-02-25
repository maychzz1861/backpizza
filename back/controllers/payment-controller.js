const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// สร้าง Payment
exports.createPayment = async (req, res, next) => {
  const { paymentDate, paymentMethod, amountPaid, orderId } = req.body;
  try {
    const payment = await prisma.payment.create({
      data: {
        paymentDate,
        paymentMethod,
        amountPaid,
        order: { connect: { id: orderId } },
      },
    });
    res.status(201).json({ payment });
  } catch (error) {
    next(error);
  }
};

// ดึงข้อมูล Payment ทั้งหมด
exports.getAllPayments = async (req, res, next) => {
  try {
    const payments = await prisma.payment.findMany();
    res.status(200).json({ payments });
  } catch (error) {
    next(error);
  }
};

// ดึงข้อมูล Payment ตาม ID
exports.getPaymentById = async (req, res, next) => {
  const paymentId = req.params.id;
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: parseInt(paymentId) },
    });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ payment });
  } catch (error) {
    next(error);
  }
};

// อัปเดตข้อมูล Payment ตาม ID
exports.updatePaymentById = async (req, res, next) => {
  const paymentId = req.params.id;
  const { paymentDate, paymentMethod, amountPaid, orderId } = req.body;
  try {
    const updatedPayment = await prisma.payment.update({
      where: { id: parseInt(paymentId) },
      data: {
        paymentDate,
        paymentMethod,
        amountPaid,
        order: { connect: { id: orderId } },
      },
    });
    res.status(200).json({ payment: updatedPayment });
  } catch (error) {
    next(error);
  }
};

// ลบ Payment ตาม ID
exports.deletePaymentById = async (req, res, next) => {
  const paymentId = req.params.id;
  try {
    await prisma.payment.delete({
      where: { id: parseInt(paymentId) },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
