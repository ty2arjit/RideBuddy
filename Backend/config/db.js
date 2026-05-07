const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MongoURI = process.env.MONGO_URI;
console.log("MongoDB URI:", MongoURI); 

const connectDB = async () => {
  mongoose
      .connect(MongoURI)
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.log("Database connection error : ",err));
};

module.exports = connectDB;
