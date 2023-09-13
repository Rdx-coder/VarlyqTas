const crypto = require('crypto');

// Generate a random JWT secret (256 bits)
const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log(`JWT Secret: ${jwtSecret}`);
// const crypto = require('crypto');

// Generate a random refresh token secret (256 bits)
const refreshTokenSecret = crypto.randomBytes(32).toString('hex');
console.log(`Refresh Token Secret: ${refreshTokenSecret}`);
