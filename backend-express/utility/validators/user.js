const { body } = require("express-validator");
const prismaClient = require("../../prisma/client");

const validateUser = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email format is invalid")
    .custom(async (value, { req }) => {
      const data = await prismaClient.user.findUnique({
        where: { email: value },
      });
      if (data && data.id !== Number(req.params.id)) {
        throw new Error("Email is already exist");
      }
      return true;
    }),
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isLength({ max: 20 })
    .withMessage("Role can't be more than 20 chars"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 15 })
    .withMessage("Password must be in range of 6 to 15 chars"),
];

module.exports = { validateUser };
