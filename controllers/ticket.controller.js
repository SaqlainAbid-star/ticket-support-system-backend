const mongoose = require("mongoose");
const TicketModal = mongoose.model("Tickets");
const nodemailer = require("nodemailer");

module.exports.createTicket = async (req, res) => {
  try {
    const {
      customerId,
      customerName,
      customerEmail,
      customerPhoneNumber,
      problem,
      date,
      ticketStatus,
    } = req.body;
    const rndmNum1 = Math.floor(Math.random() * 10);
    const rndmNum2 = Math.floor(Math.random() * 10);
    const rndmNum3 = Math.floor(Math.random() * 10);
    const rndmNum4 = Math.floor(Math.random() * 10);
    const rndmNum5 = Math.floor(Math.random() * 10);
    const rndmNum6 = Math.floor(Math.random() * 10);
    const referenceNum =
      rndmNum1 +
      "" +
      rndmNum2 +
      "" +
      rndmNum3 +
      "" +
      rndmNum4 +
      "" +
      rndmNum5 +
      "" +
      rndmNum6;
    await TicketModal.create({
      customerId,
      customerName,
      customerEmail,
      customerPhoneNumber,
      problem,
      date,
      ticketStatus,
      referenceNum,
    });
    // let testAccount = nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      // port: 587,
      service: "gmail",
      auth: {
        user: "jamalisaqlain7@gmail.com",
        pass: "urgbklfjojnymore",
      },
    });
    const mailOptions = {
      from: "jamalisaqlain7@gmail.com",
      to: customerEmail,
      subject: "Ticket Reference Number",
      text: `Your tickey has been sent to the admin soon you will be contacted. Your ticket reference number is ${referenceNum}. Please keep to private as it can be used to check your ticket status.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    res
      .status(200)
      .json({ status: "Ticket created successfuly", referenceNum });
  } catch (error) {
    res.status(400).json({ status: "Ticket could not be created" });
    console.log("createTicket error >> ", error);
  }
};

module.exports.closeTicket = async (req, res) => {
  try {
    const { _id } = req.params;
    const { ticketStatus } = req.body;
    console.log("ClosingTicket ID >> " + _id + " status >> " + ticketStatus);
    const closingTicket = await TicketModal.findByIdAndUpdate(
      _id,
      { ticketStatus },
      { new: true }
    );
    res.status(201).json({ status: "Ticket Closed", closingTicket });
  } catch (error) {
    res.status(400).send({ status: "Ticket could not be closed" });
    console.log("closeTicket error >> ", error);
  }
};

module.exports.getCustomerTickets = async (req, res) => {
  try {
    const { id } = req.body;
    const allTickets = await TicketModal.find({ customerId: id });
    res.status(201).json({
      status: "Ok",
      allTickets,
    });
    // console.log("LoggedInUser _id >> " + id);
  } catch (error) {
    res.status(400).send({ status: "Something went wrong" });
    console.log("getCustomerTickets error >> ", error);
  }
};

module.exports.getAllTickets = async (req, res) => {
  try {
    const allTickets = await TicketModal.find({});
    res.status(200).json({
      status: "Ok",
      allTickets,
    });
  } catch (error) {
    res.status(400).json({ status: error });
  }
};

module.exports.getChats = async (req, res) => {
  try {
    const { _id } = req.params;
    const customerTicket = await TicketModal.findById({ _id });
    res.status(201).json({ ticket: customerTicket });
    // console.log("_id >>> " + _id);
  } catch (error) {
    res.status(400).send({ status: error });
    console.log("getChats error >>> ", error);
  }
};
