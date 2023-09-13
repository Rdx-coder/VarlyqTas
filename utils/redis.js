// utils/redis.js
const Redis = require('ioredis');
const config = require('../config/config');

const redis = new Redis({
  host: config.redisHost,
  port: config.redisPort,
});

function connectToRedis() {
  redis.on('connect', () => {
    console.log('Connected to Redis');
  });

  redis.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
  });
}

module.exports = {
  redis,
  connectToRedis,
};
