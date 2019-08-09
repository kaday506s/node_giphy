// import model User
const jwt = require("jsonwebtoken");
const User = require("../model/user_model");

// Function to check data to rout user
function check_data(body) {
  // ToDo check data edit

  // Check data
  if (body.password && body.email && body.name) {
    // Check password length
    if (body.password.length < 5) {
      return { error: true, text: "bad password" };
    }
    // Check name length
    if (body.name.length < 2) {
      return { error: true, text: "low Name" };
    }
    // if (body.email)
    return { error: false, text: "" };
  }
  return { error: true, text: "Bad data" };
}

// to registration user in sys
exports.reg_user = async function(req, res) {
  console.log(req.body);

  const data = check_data(req.body);

  // Check error
  if (!data.error) {
    // Get params
    const email = req.body.email.toString();
    const password = req.body.password.toString();
    const name = req.body.name.toString();

    // Cheack user in bd
    const per = await User.findOne({ email }).exec();

    // if per in bd
    if (per) {
      return res.send({ error: false, text: "you are reg in system" });
    }
    // Create User
    const user = new User({
      email,
      password,
      name
    });

    // Save User
    user
      .save()
      .then(doc => {
        console.log(doc);
        return res.send(doc);
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    return res.send(data);
  }
};

// Func to login in sys
exports.login_user = async function(req, res) {
  console.log(req.body);
  // ToDo check Name

  // Check data
  const data = check_data(req.body);

  if (!data.error) {
    // Get Params from req
    const email = req.body.email.toString();
    const password = req.body.password.toString();

    // Cheack user in bd
    const per = await User.findOne({ email }).exec();

    // if per in bd
    if (per) {
      // check password
      if (per.password === password) {
        // Create token
        const data_token = jwt.sign(
          { email: per.email, password: per.password },
          "123"
        );
        console.log(data_token);
        // Set cookie
        res.cookie("token", data_token, { maxAge: 360000 });
        res.cookie("Logging", true, { maxAge: 360000 });

        res.send({ error: false, text: "OK" });
      } else {
        res.send({ error: true, text: "Password dont match" });
      }
    } else {
      res.send({ error: true, text: "Not in bd" });
    }
  } else {
    res.send(data);
  }
};

// Func to login in sys
exports.logout_user = async function(req, res) {
  // Clean cookie
  res.clearCookie("token");
  res.clearCookie("Logging");
  res.send({ error: false, text: "logout" });
};

// Func if user not login in sys
exports.most_login = function(req, res) {
  res.send({ error: true, text: "login in sys" });
};
