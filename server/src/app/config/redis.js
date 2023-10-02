const redis = require("redis");

// create client redis
const redisClient = redis.createClient();

module.exports = redisClient;
