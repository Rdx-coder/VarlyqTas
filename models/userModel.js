// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  refreshTokens: [{ token: String }],
});

module.exports = mongoose.model('User', userSchema);
