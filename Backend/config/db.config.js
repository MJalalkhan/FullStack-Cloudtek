const mongoose = require("mongoose");
const DB_URI = "mongodb://localhost/UrlShortener";

mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to mongodb..", err.message));

const connection = mongoose.connection;

module.exports = connection;
