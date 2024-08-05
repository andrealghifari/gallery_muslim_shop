const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const prismaClient = require("../prisma/client");

const register = async (req, res) => {
  const errorResult = validationResult(req);
  if (!errorResult.isEmpty()) {
    return res.status(422).send({
      success: false,
      message: "Validation Error",
      error: errorResult.array(),
    });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const dataUser = await prismaClient.user.create({
      data: {
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    return res.status(201).send({
      success: true,
      message: "Successfully created a user",
      data: dataUser,
    });
  } catch (errors) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: errors.message || errors,
    });
  }
};

module.exports = { register };
