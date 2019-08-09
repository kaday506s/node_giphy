const mongoose = require("mongoose");

// Set up default mongoose connection
mongoose.connect("mongodb://localhost/S", { useNewUrlParser: true });

// model
const User_like = new mongoose.Schema({
  email: String,
  like_id: String
});

// make this available to our users in our Node applications
module.exports = mongoose.model("User_like", User_like);
