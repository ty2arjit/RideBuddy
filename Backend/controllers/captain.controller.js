const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const BlacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult( req );

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password, vehicle } = req.body;

  const isCaptainExist = await captainModel.findOne({ email });

  if( isCaptainExist ) {
    return res.status(400).json({ error: 'Captain with this email already exists' });
  }

  const hashedPassword = await captainModel.hashPassword( password );

  const captain = await captainService.createCaptain({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    type: vehicle.type
  });

  const token = captain.generateAuthToken();

  const captainObj = captain.toObject();
  delete captainObj.password;

  res.status(201).json({ token, captain: captainObj });
}

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select('+password'); 

  if( !captain ) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const isMatch = await captain.comparePassword( password );

  if( !isMatch ) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const token = await captain.generateAuthToken();
  const captainObj = captain.toObject();
  delete captainObj.password;

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
  });
  res.status(200).json({ token, captain: captainObj });
}

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
  const token =
    req.cookies?.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (token) {
    await BlacklistTokenModel.create({ token });
  }

  res.clearCookie("token", {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
};
