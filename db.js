const dotenv = require("dotenv");
dotenv.config();
const { MongoClient, ObjectId } = require("mongodb");

MongoClient.connect(process.env.CONNECTIONSTRING)
  .then((client) => {
    module.exports = client;
    const app = require("./app");
    console.log("Database connected successfully.");

    // Start server
    return app.listen(process.env.PORT);
  })
  .then(() => {
    console.log("Server listening on port 3000");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
