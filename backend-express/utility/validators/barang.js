const { body } = require("express-validator");
const prisma = require("../../prisma/client");

const validateBarang = [
  body("name")
    .notEmpty()
    .withMessage("Nama Barang is required")
    .custom(async (value, { req }) => {
      const data = await prisma.barang.findFirst({ where: { name: value } });

      if (data && data.id !== Number(req.params.id)) {
        throw new Error("Barang is already exist!");
      }
      return true;
    }),
  body("type")
    .notEmpty()
    .withMessage("Tipe Barang is required")
    .isLength({ min: 1, max: 50 })
    .withMessage("Tipe Barang maximum is 50 chars"),
  body("quantity")
    .notEmpty()
    .withMessage("Jumlah is required")
    .isInt()
    .withMessage("Jumlah must be numbers"),
  body("value")
    .notEmpty()
    .withMessage("Harga Satuan is required")
    .isNumeric()
    .withMessage("Harga Satuan must be numbers"),
  body("supplier_code")
    .notEmpty()
    .withMessage("Supplier is required")
    .isInt()
    .withMessage("Supplier must be integer"),
];

module.exports = { validateBarang };
