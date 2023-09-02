const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userType: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
  },
  {
    collection: "Customers",
  }
);

mongoose.model("Customers", userSchema);
