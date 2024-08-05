const prisma = require("../prisma/client");
const { validationResult } = require("express-validator");

const findSuppliers = async (req, res) => {
  try {
    const dataSupplier = await prisma.supplier.findMany({
      orderBy: { name: "asc" },
    });
    if (!dataSupplier) {
      return res
        .status(422)
        .send({ success: false, message: "There's currently no data" });
    }
    return res.status(200).send({
      success: true,
      message: "Get Data Suppliers",
      data: dataSupplier,
    });
  } catch (error) {
    callBackError(res, error);
  }
};

const findSupplierById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await prisma.supplier.findUnique({
      where: { id: Number(id) },
      select: { name: true, location: true, phone_number: true },
    });

    if (!data)
      return res.status(404).send({
        success: false,
        message: `There's no data supplier found with ID ${id}`,
      });
    return res.status(200).send({
      success: true,
      message: `Retrieved data for ID ${id}`,
      data: data,
    });
  } catch (error) {
    callBackError(res, error);
  }
};

const createSupplier = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).send({
      success: false,
      message: "Validation Supplier Error",
      error: errors.array(),
    });
  try {
    const data = await prisma.supplier.create({
      data: {
        name: req.body.name,
        location: req.body.location,
        phone_number: req.body.phone_number,
      },
      select: { name: true },
    });

    return res.status(200).send({
      success: true,
      message: `Successfully created supplier ${data.name}`,
      data: data,
    });
  } catch (error) {
    callBackError(res, error);
  }
};

const updateSupplier = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .send({ success: false, message: "Validation Error", error : errors.array()});
  }
  const { id } = req.params;
  try {
    const data = await prisma.supplier.update({
      data: {
        name: req.body.name,
        location: req.body.location,
        phone_number: req.body.phone_number,
      },
      where: { id: Number(id) },
      select: { name: true },
    });
    if (!data)
      return res
        .status(404)
        .send({ success: false, message: `There's no data with ID ${id}` });

    return res.status(200).send({
      success: true,
      message: `Successfully update supplier ID ${id}`,
    });
  } catch (error) {
    callBackError(res, error);
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.supplier.delete({
      where: { id: Number(id) },
      select: { name: true },
    });
    if (!data)
      return res.status(404).send({
        success: false,
        message: `There's no data supplier found with ID ${id}`,
      });
    return res.status(200).send({
      success: true,
      message: `Successfully deleted supplier ${data.name}`,
    });
  } catch (error) {
    callBackError(res, error);
  }
};

const callBackError = (res, error) => {
  return res.status(500).send({
    success: false,
    message: "Internal server error",
    error: error.message,
  });
};
module.exports = {
  findSuppliers,
  createSupplier,
  findSupplierById,
  deleteSupplier,
  updateSupplier,
};
