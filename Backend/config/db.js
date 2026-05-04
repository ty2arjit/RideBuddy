const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async() => {
  try {
    await mongoose.connect(MongoURI);
    console.log('Connected to MongoDB successfully');
  } catch(error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

module.exports = connectDB;
