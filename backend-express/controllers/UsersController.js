const prisma = require("../prisma/client");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const findUsers = async (req, res) => {
  try {
    const userData = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
      orderBy: { name: "asc" },
    });
    return res.status(200).send({
      success: true,
      message: "Successfully get user data",
      data: userData,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error: error });
  }
};

const findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: { id: true, name: true, role: true, email: true },
    });
    if (!data) {
      return res
        .status(404)
        .send({ success: false, message: "User is not found" });
    }
    return res
      .status(200)
      .send({ success: true, message: "User is found", data: data });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error: error });
  }
};

const editUser = async (req, res) => {
  const errors = validationResult(req);
  const { id } = req.params;
  if (!errors.isEmpty()) {
    return res.status(422).send({
      sucess: true,
      message: "Validation Erorr",
      error: errors.array(),
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const result = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        password: hashedPassword,
      },
      select: { name: true, email: true, role: true },
    });

    if (!result) {
      return res.status(404).send({
        succes: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      sucess: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error", error: error });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const dataUser = await prisma.user.delete({
      where: { id: Number(id) },
      select: { name: true },
    });
    return res.status(200).send({
      success: true,
      message: `User ${dataUser.name} has deleted successfully`,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .send({ success: false, message: "Validation Error", error: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newData = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        role: req.body.role,
        password: hashedPassword,
      },
    });

    return res.status(201).send({
      success: true,
      message: `New user ${newData.name} has created!`,
      data: newData,
    });
  } catch (error) {}
};
module.exports = { findUsers, findUserById, createUser,editUser, deleteUser };
