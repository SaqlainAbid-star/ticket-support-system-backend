const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getAllCustomers,
  searchCustomerByName,
} = require("../controllers/user.controller");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/getAllCustomers", getAllCustomers);
router.post("/searchCustomerByName", searchCustomerByName);

module.exports = router;
