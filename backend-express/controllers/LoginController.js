const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prismaClient = require("../prisma/client");

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({
      success: false,
      message: "Validation error",
      error: errors.array(),
    });
  }

  try {
    const dataUser = await prismaClient.user.findFirst({
      select: { id: true, name: true, role: true, email: true, password: true },
      where: { email: req.body.email },
    });

    if (!dataUser) {
      return res.status(404).send({
        success: false,
        message: `User with email ${req.body.email} is unregistered`,
      });
    }  
    
    const validPassword = await bcrypt.compare(
      req.body.password,
      dataUser.password
    );

    if (!validPassword) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign({ id: dataUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password, ...userWithoutPassword } = dataUser;

    res.status(200).send({
      success : true,
      message: `User ${dataUser.name} login successfully`,
      data: { user: userWithoutPassword, token: token },
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error : error.message || error});
  }
};

module.exports = { login };
