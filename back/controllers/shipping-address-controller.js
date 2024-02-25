const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// สร้าง shipping address
exports.createShippingAddress = async (req, res, next) => {
    const { firstName, lastName, phone, email, address, province, district, subDistrict, isMainAddress, userId } = req.body;
    try {
      const shippingAddress = await prisma.shipping_Address.create({
        data: {
          firstName,
          lastName,
          phone,
          email,
          address,
          province,
          district,
          subDistrict,
          isMainAddress,
          user: {
            connect: {
              id: userId // ใช้ userId ที่รับมาจาก req.body
            }
          }
        }
      });
      res.status(201).json({ shippingAddress });
    } catch (error) {
      next(error);
    }
  };

// ดึงข้อมูลทั้งหมดของ shipping address
exports.getAllShippingAddresses = async (req, res, next) => {
  try {
    const shippingAddresses = await prisma.shipping_Address.findMany();
    res.status(200).json({ shippingAddresses });
  } catch (error) {
    next(error);
  }
};

// ดึงข้อมูลของ shipping address โดยใช้ ID
exports.getShippingAddressById = async (req, res, next) => {
  const shippingAddressId = req.params.id;
  try {
    const shippingAddress = await prisma.shipping_Address.findUnique({
      where: { id: parseInt(shippingAddressId) },
    });
    if (!shippingAddress) {
      return res.status(404).json({ message: "Shipping address not found" });
    }
    res.status(200).json({ shippingAddress });
  } catch (error) {
    next(error);
  }
};

// อัปเดตข้อมูลของ shipping address โดยใช้ ID
exports.updateShippingAddressById = async (req, res, next) => {
  const shippingAddressId = req.params.id;
  const { firstName, lastName, phone, email, address, province, district, subDistrict, isMainAddress, userId } = req.body;
  try {
    const updatedShippingAddress = await prisma.shipping_Address.update({
      where: {
        id: parseInt(shippingAddressId),
      },
      data: {
        firstName,
        lastName,
        phone,
        email,
        address,
        province,
        district,
        subDistrict,
        isMainAddress,
        user: { connect: { id: userId } } // เชื่อมข้อมูลกับผู้ใช้ที่มี userId ที่กำหนด
      },
    });
    res.status(200).json({ shippingAddress: updatedShippingAddress });
  } catch (error) {
    next(error);
  }
};

// ลบ shipping address โดยใช้ ID
exports.deleteShippingAddressById = async (req, res, next) => {
  const shippingAddressId = req.params.id;
  try {
    await prisma.shipping_Address.delete({
      where: {
        id: parseInt(shippingAddressId),
      },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
