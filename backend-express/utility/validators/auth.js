const { body } = require("express-validator");
const PrismaClient = require("../../prisma/client");

const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  body("password").notEmpty().withMessage("Password is required"),
];

const validateRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("role")
    .notEmpty()
    .withMessage("User Role is required")
    .isLength({ max: 20 }),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .isLength({ max: 50 })
    .withMessage("Email maximum 50 chars")
    .custom(async (value, { req }) => {
      const dataUser = await PrismaClient.user.findUnique({
        where: { email: value },
      });
      if (dataUser && dataUser.id !== Number(req.params.id))
        throw new Error("Email is already exist");
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 15 })
    .withMessage("Password must between in range of 6 to 15"),
];

module.exports = { validateRegister, validateLogin };
