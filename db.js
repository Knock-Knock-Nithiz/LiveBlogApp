const dotenv = require("dotenv");
dotenv.config();
const { MongoClient, ObjectId } = require("mongodb");

MongoClient.connect(process.env.CONNECTIONSTRING)
  .then((client) => {
    module.exports = client;
    const app = require("./app");
    console.log("Database connected successfully.");

    // Start server
    const port = process.env.PORT || 3000;
    return app.listen(port);
  })
  .then(() => {
    const port = process.env.PORT || 3000;
    console.log(`Server listening on port ${port}`);
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
