const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const prismaClient = require("../prisma/client");
const bcrypt = require("bcryptjs");

const login2 = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({
      success: false,
      message: "Validation Errors",
      error: errors,
    });
  }
  try {
    //mengakses DB berdasarkan email
    const dataUser = await prismaClient.user.findFirst({
      where: { email: req.body.email },
      select: { id: true, email: true, name: true, password: true },
    });
    if (!dataUser) {
      return res
        .status(404)
        .send({
          success: false,
          message: `User with email ${req.body.email} not found`,
        });
    }

    // comparing password
    const resultComparePassword = await bcrypt.compare(
      req.body.password,
      dataUser.password
    );
    if (!resultComparePassword) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid password, failed to login" });
    }

    // sign jwt ke payload
    //token yang terbawa akan dicek scr berkala oleh middleware
    const token = jwt.sign({ id: dataUser.id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    //hapus password yang terbawa,return respond
    const { password, ...userWithoutPassword } = dataUser;

    return res
      .status(200)
      .send({
        success: true,
        message: `User ${dataUser.name} berhasil login!`,
        data: {user : userWithoutPassword, token : token},
      });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

module.exports = { login2 };
