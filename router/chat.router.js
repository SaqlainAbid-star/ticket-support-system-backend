const express = require("express");
const {
  createChat,
  getChatMessages,
} = require("../controllers/customerChat.controller");
const router = express.Router();

router.post("/chat", createChat);
router.get("/getChatMessages/:_id", getChatMessages);

module.exports = router;
