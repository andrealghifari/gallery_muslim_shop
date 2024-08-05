const { body } = require("express-validator");
const prisma = require("../../prisma/client");

const validateSupplier = [
  body("name")
    .notEmpty()
    .withMessage("Supplier Name is required")
    .custom(async (value, { req }) => {
      const checkName = await prisma.supplier.findFirst({
        where: { name: value },
      });
      if (checkName && checkName.id !== Number(req.params.id)) {
        throw new Error("Supplier Name is already exist");
      }
    }),
  body("location")
    .notEmpty()
    .withMessage("Location is required")
    .isString()
    .withMessage("Location must be string"),
  body("phone_number")
    .notEmpty()
    .withMessage("Phone Number is required")   
    .isLength({ max: 12 })
    .withMessage("Phone Number length max is 12"),
];

module.exports = { validateSupplier };
