const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const { app, server } = require("./socket/index");

//const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const Port = process.env.PORT;

app.get("/", (req, res) => {
  res.json({
    message: "hello from beckend",
  });
});

//api endpoints
app.use("/api", router);

connectDB().then(() => {
  server.listen(Port, () => {
    console.log("server running " + Port);
  });
});
