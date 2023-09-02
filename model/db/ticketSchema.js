const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    customerPhoneNumber: { type: String, required: true },
    customerEmail: { type: String, required: true, unique: false },
    problem: { type: String, required: true },
    date: { type: String },
    ticketStatus: { type: String },
    referenceNum: { type: Number, unique: true, required: true },
  },
  {
    collection: "Tickets",
  }
);

mongoose.model("Tickets", userSchema);
