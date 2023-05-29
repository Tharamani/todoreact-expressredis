const express = require("express");
const dotenv = require("dotenv");
const { connectDb } = require("./config/db");
const todoRouter = require("./routes/todo");

try {
  const app = express();

  // Connect to localhost on port 6379.
  connectDb();

  dotenv.config(); // loads .env file contents into process.env
  app.use("/todo", todoRouter); // mount the router on the app

  app.listen(process.env.SERVER_PORT || 5000, () => {
    console.log(`App listening on port ${process.env.SERVER_PORT}`);
  });
} catch (error) {
  console.log("App Error", error);
}
// module.exports = { redClient };
