// utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

function generateAccessToken(user) {
  return jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '15m' });
}

function generateRefreshToken(user) {
  const refreshToken = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '7d' });
  user.refreshTokens.push({ token: refreshToken });
  return refreshToken;
}

module.exports = { generateAccessToken, generateRefreshToken };
