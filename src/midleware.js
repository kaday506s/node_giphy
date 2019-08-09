const jwt = require("jsonwebtoken");
const User = require("./model/user_model");

// Check token login ( middleware )
exports.mid = async function(req, res, next) {
  console.log(req.cookies);
  // check token
  if (req.cookies.token) {
    // decode token
    const decoded = jwt.verify(req.cookies.token, "123");

    // find user in BD
    const per = await User.findOne({
      email: decoded.email,
      password: decoded.password
    }).exec();

    // if user login in sys
    if (per) {
      next();
    } else {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
};
