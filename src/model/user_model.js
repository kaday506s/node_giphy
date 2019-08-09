const mongoose = require("mongoose");

// Set up default mongoose connection
mongoose.connect("mongodb://localhost/S", { useNewUrlParser: true });

// models users
const User = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// make this available to our users in our Node applications
module.exports = mongoose.model("User", User);
