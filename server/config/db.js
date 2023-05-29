const redis = require("redis");

const redisOption = {
  host: "127.0.0.1",
  port: 5378,
};

let client;

const connectDb = async () => {
  try {
    client = redis.createClient();
    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect(redisOption);
    console.log("Connected successfully to server");
    // client.set("key:3", "value3new");
    // console.log("client get ", await client.get("key:3"));
  } catch (e) {
    console.error(e);
  }
};

module.exports = { connectDb, client };
