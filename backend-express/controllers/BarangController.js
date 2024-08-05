const { validationResult } = require("express-validator");
const prisma = require("../prisma/client");

const createBarang = async (req, res) => {
  const checkError = validationResult(req);
  if (!checkError.isEmpty()) {
    return res.status(422).send({
      success: false,
      message: "Validation Barang Error",
      error: checkError.array(),
    });
  }

  try {
    const data = await prisma.barang.create({
      data: {
        name: req.body.name,
        quantity: Number(req.body.quantity),
        type: req.body.type,
        supplier_code: Number(req.body.supplier_code),
      },
    });
    return res.status(201).send({
      success: true,
      message: `Barang ${data.name} has just added!`,
      data: data,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error: error });
  }
};
const editBarang = async (req, res) => {
  const errors = validationResult(req);
  const { id } = req.params;
  if (!errors.isEmpty()) {
    return res.status(422).send({
      success: false,
      message: "Validation Error",
      error: errors.array(),
    });
  }

  try {
    const dataUpdateBarang = await prisma.barang.update({
      where: { id: Number(id) },
      data: {
        name: req.body.name,
        quantity: Number(req.body.quantity),
        type: req.body.type,
        supplier_code: Number(req.body.supplier_code),
        value : Number(req.body.value)
      },
      select: { name: true },
    });
    if (!dataUpdateBarang) {
      return res.status(404).send({
        success: false,
        message: `Barang ${req.body.name} isn't found`,
      });
    }

    return res
      .status(200)
      .send({
        success: true,
        message: `Successfully update Barang ${dataUpdateBarang.name}`,
      });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error: error });
  }
};
const findBarangs = async (req, res) => {
  try {
    const data = await prisma.barang.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        quantity: true,
        supplier_code: true,
        value : true,
        created_at : true
      },
      orderBy: { name: "asc" },
    });
    if (!data) {
      return res.status(200).send({ success: true, data: [] });
    }
    return res.status(200).send({
      success: true,
      message: "Successfully get all data users",
      data: data,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error: error });
  }
};
const findBarangById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await prisma.barang.findUnique({
      select: { name: true, type: true, quantity: true, supplier_code: true, value : true},
      where: { id: Number(id) },
    });
    if (!data) {
      return res
        .status(404)
        .send({ success: false, message: `Barang ${data.name} is not found` });
    }
    return res.status(200).send({
      success: true,
      message: `Successfully get barang Id = ${id} `,
      data: data,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error: error });
  }
};
const deleteBarang = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await prisma.barang.delete({
      where: { id: Number(id) },
      select: { name: true },
    });
    return res.status(200).send({
      success: true,
      message: `Successfully deleted barang ${data.name}`,
      data: data,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};
module.exports = {
  createBarang,
  deleteBarang,
  findBarangById,
  findBarangs,
  editBarang,
};
