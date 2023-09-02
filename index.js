const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(express.json());
const mongoose = require("mongoose");
require("./model/db/userSchema");
require("./model/db/ticketSchema");
require("./model/db/customerChatSchema");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
// const DB = 'mongodb://127.0.0.1:27017/task-management' ;
const DB = 'mongodb+srv://Saqlain:Saqlain123@cluster0.oo31c.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to mongoDB"))
  .catch((e) => console.log(e));



app.get("/", (req, res) => {
  res.send("Sever Running");
});

app.use("/api", require("./router/user.router"));
app.use("/api", require("./router/ticket.router"));
app.use("/api", require("./router/chat.router"));

app.listen(3001, () => {
  console.log("Server running");
});
