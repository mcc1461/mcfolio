// server.js

const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 8061;

const dbConnection = require("./config/dbConnection");
dbConnection();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(8061, () => {
  console.log(`Server is running on port ${port}`);
});
