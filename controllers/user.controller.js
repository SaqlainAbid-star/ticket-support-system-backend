const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = mongoose.model("Customers");
const TicketModal = mongoose.model("Tickets");
const { SECRET_KEY } = require("../data/key");

module.exports.createUser = async (req, res) => {
  const { name, phoneNumber, email,userType, password } = req.body;
  //   console.log("body data: ", req.body);
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.json({ status: "Email Already Exists" });
    }
    await User.create({
      name,
      phoneNumber,
      email,
      userType,
      password: encryptedPassword,
    });
    res.status(200).send({ status: "User created successfully" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, SECRET_KEY, {
      expiresIn: "1hr",
    });

    if (res.status(201)) {
      return res.json({
        status: "Login Successful",
        data: {
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            phoneNumber: user.phoneNumber,
          },
          token,
        },
      });
    } else {
      return res.json({ status: "Something went wrong. Try again." });
    }
  }
  res.json({
    status: "Invalid Email or Password",
    error: "Invalid Email or Password",
  });
};

module.exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find();
    res.status(200).send({ users: customers });
  } catch (error) {
    res.status(400).send("Can not get all customers");
    console.log("get all users error ", error);
  }
};

module.exports.searchCustomerByName = async (req, res) => {
  try {
    const search = req.body;
    const searchedCustomer = await TicketModal.find(search);
    if (searchedCustomer) {
      res.status(201).send({ customer: searchedCustomer });
    } else if (!searchedCustomer) {
      res.status(201).send({ status: "Customer does not exist" });
    }
  } catch (error) {
    res.status(400).send({ status: "Something went wrong" });
    console.log("searchCustomerByName err >> ", error);
  }
};
