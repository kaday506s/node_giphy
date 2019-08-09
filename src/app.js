// Author : Misha Kaday
// imports
const port = 3000;

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const logger = require("morgan");

// main
const giphyRouter = require("./routes/giphy");
const usersRouter = require("./routes/users");
const mid = require("./midleware");

const app = express();

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// middleware check cookies
app.all("/gif/*", mid.mid);

// add routing
app.use("/gif", giphyRouter);
app.use("/", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// start
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
