const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = process.env.JWT_SECRET;

const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [2, 'First name must have at least 2 characters'],
    },
    lastName: {
      type: String,
    },
  },
  email : {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must have at least 6 characters'],
    select: false,
  },
  socketId: {
    type: String,
  }
})

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, Token, { expiresIn: '24h' });
  return token;
}

userSchema.methods.comparePassword = async function ( password ) {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.hashPassword = async function( password ) {
  return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;