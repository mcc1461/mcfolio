// dbConnection.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.mongoDB);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

module.exports = dbConnection;
