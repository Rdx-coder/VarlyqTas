// config/config.js

module.exports = {
    mongoURI: 'mongodb://127.0.0.1/my-api',
    jwtSecret: process.env.JWT_SECRET || '8a29881c829c04290777dac7b9c8d62726c84b8273222d1482b220a4ecbd222b' , 
    jwtExpiration: '1h', 
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || '6445723b3d06f9b9466d3b2ec9d878c9e455b411558b949210af30b6df206588', 
    refreshTokenExpiration: 604800, 
    redisHost: '127.0.0.1', 
    redisPort: 6379,
  };
  