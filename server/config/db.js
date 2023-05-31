const redis = require("redis");

// Connect to redis Database
const client = redis.createClient();
const connectDb = async () => {
  try {
    // By default, redis.createClient() will use 127.0.0.1
    // and 6379 as the hostname and port respectively.

    client.on("error", (err) => console.log("Redis Client Error", err));

    client.connect();
    console.log("Connected successfully to DB server");
  } catch (e) {
    console.error(e);
  }
};

module.exports = { connectDb, client };
