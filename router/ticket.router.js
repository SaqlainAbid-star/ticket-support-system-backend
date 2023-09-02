const express = require("express");
const {
  createTicket,
  getAllTickets,
  getCustomerTickets,
  getChats,
  closeTicket,
} = require("../controllers/ticket.controller");
const router = express.Router();

router.post("/createTicket", createTicket);
router.put("/closeTicket/:_id", closeTicket);
router.get("/getAllTickets", getAllTickets);
router.post("/getCustomerTickets/:_id", getCustomerTickets);
router.get("/getChats/:_id", getChats);

module.exports = router;
