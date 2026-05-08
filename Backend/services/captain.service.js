const captainModel = require("../models/captain.model")

module.exports.createCaptain = async ({
  firstName, lastName, email, password,
  color, plate, capacity, type
}) => {
  if(!firstName || !email || !password || !color || !plate || !capacity || !type) {
    throw new Error('All fields are required');
  }

  const captain = await captainModel.create({
    fullName: { firstName, lastName },
    email,
    password,
    vehicle: { color, plate, capacity, type },
  });

  return captain;
}