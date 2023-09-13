// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  // Check if token is missing
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    req.user = decoded.user;
    
    // Continue processing the request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};

