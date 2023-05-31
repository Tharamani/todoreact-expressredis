const express = require("express");
const dotenv = require("dotenv");
const { connectDb } = require("./config/db");
const todoRouter = require("./routes/todo");

try {
  const app = express();
  // loads .env file contents into process.env
  dotenv.config();
  app.use(express.json({ type: "*/*" })); //  parses incoming requests with JSON payloads
  // Connect to redis client from localhost on port 6379.
  connectDb();

  app.use("/todo", todoRouter); // mount the router on the app

  app.listen(process.env.SERVER_PORT || 5000, () => {
    console.log(`App listening on port ${process.env.SERVER_PORT}`);
  });
} catch (error) {
  console.log("App Error", error);
}
