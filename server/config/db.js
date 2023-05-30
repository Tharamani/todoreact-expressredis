const redis = require("redis");
const dotenv = require("dotenv");

// loads .env file contents into process.env
dotenv.config();

// Connect to redis Database
const client = redis.createClient();
const connectDb = async () => {
  try {
    // By default, redis.createClient() will use 127.0.0.1
    // and 6379 as the hostname and port respectively.

    client.on("error", (err) => console.log("Redis Client Error", err));

    client.connect();
    console.log("Connected successfully to DB server");

    // let id = await client.set("id", 0);
    // console.log("id", id);
  } catch (e) {
    console.error(e);
  }
};

module.exports = { connectDb, client };
