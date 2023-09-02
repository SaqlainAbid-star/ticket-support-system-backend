const mongoose = require("mongoose");
const ChatModel = mongoose.model("ChatMessages");

module.exports.createChat = async (req, res) => {
  try {
    const { customerId, ticketId, message } = req.body;
    await ChatModel.create({ customerId, ticketId, message });
    res.status(201).json("Message sent successfully");
  } catch (error) {
    res.status(400).send("Message failed");
    console.log("createChat error >> ", error);
  }
};

module.exports.getChatMessages = async (req, res) => {
  try {
    // find chat with ticketId
    const { _id } = req.params;
    const messages = await ChatModel.find({ ticketId: _id });
    res.status(201).json({ status: "Ok", messages: messages });
    // console.log("_id >> " + _id);
  } catch (error) {
    console.log("getChatMessages error >> ", error);
  }
};
