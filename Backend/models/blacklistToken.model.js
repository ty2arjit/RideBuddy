const mongoose = require('mongoose');

const BlacklistTokenModelSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '24h' 
  }
});

const BlacklistTokenModel = mongoose.model('BlacklistTokenModel', BlacklistTokenModelSchema);

module.exports = BlacklistTokenModel;