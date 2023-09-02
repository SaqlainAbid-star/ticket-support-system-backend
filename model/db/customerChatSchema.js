const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true },
    ticketId: { type: String, required: true },
    message: { type: String, unique: false, required: true },
  },
  {
    collection: "ChatMessages",
  }
);

mongoose.model("ChatMessages", chatSchema);
