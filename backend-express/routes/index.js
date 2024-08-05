/* MAIN ROUTE FILE*/

const express = require("express");
const router = express.Router();
const { login } = require("../controllers/LoginController");
const { register } = require("../controllers/RegisterController");
const {
  validateRegister,
  validateLogin,
} = require("../utility/validators/auth");
const { validateUser } = require("../utility/validators/user");
const { verifyToken } = require("../middlewares/auth");
const {
  findUsers,
  editUser,
  findUserById,
  deleteUser,
  createUser,
} = require("../controllers/UsersController");
const { validateBarang } = require("../utility/validators/barang");
const {
  createBarang,
  deleteBarang,
  findBarangById,
  findBarangs,
  editBarang,
} = require("../controllers/BarangController");
const {
  findSuppliers,
  createSupplier,
  findSupplierById,
  deleteSupplier,
  updateSupplier,
} = require("../controllers/SupplierController");
const { validateSupplier } = require("../utility/validators/supplier");

// router.get("/hello", (req, res) => {
//   res.send("Hello world!");
// });

router.post("/login", validateLogin, login);
router.post("/register", validateRegister, register);
//User config Routes
router.get("/admin/users", verifyToken, findUsers);
router.post("/admin/users", verifyToken, validateUser, createUser);
router.post("/admin/users/:id", verifyToken, findUserById);
router.put("/admin/users/:id", verifyToken, validateUser, editUser);
router.delete("/admin/users/:id", verifyToken, deleteUser);
//Barang Routes
router.get("/admin/barang", verifyToken, findBarangs);
router.post("/admin/barang", verifyToken, validateBarang, createBarang);
router.put("/admin/barang/:id", verifyToken, validateBarang, editBarang);
router.post("/admin/barang/:id", verifyToken, findBarangById);
router.delete("/admin/barang/:id", verifyToken, deleteBarang);
//Supplier Routes
router.get("/admin/supplier", verifyToken, findSuppliers);
router.post("/admin/supplier", verifyToken, validateSupplier, createSupplier);
router.post("/admin/supplier/:id", verifyToken, findSupplierById);
router.put("/admin/supplier/:id", verifyToken, validateSupplier,updateSupplier)
router.delete("/admin/supplier/:id", verifyToken, deleteSupplier);
module.exports = router;
