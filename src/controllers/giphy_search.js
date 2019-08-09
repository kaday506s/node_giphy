const giphy = require("giphy-api")("fP2U4QLV8j9UiEaPXvcKdvGbuRd7wjEv");
const jwt = require("jsonwebtoken");
const User_like = require("../model/user_like_model");

// test
exports.search_word = function(req, res) {
  console.log(req.cookies);
  return res.send({ text: " TEST " });
};

// Search gif
exports.search_word_post = function(req, res) {
  try {
    const search_word = req.body.search.toString();
    const rating = req.body.rating.toString();
    const limit = req.body.limit.toString();

    const data_res = [];

    giphy.search(
      {
        q: search_word,
        rating,
        limit,
        fmt: "json"
      },
      (err, res_gip) => {
        if (!err) {
          // "looping"
          res_gip.data.map((item, i) => {
            return data_res.push({
              gif_id: item.id,
              img: item.images.looping.mp4
            });
          });
          return res.send(data_res);
        }
        return res.send({ error: true, text: "Bad requests" });
      }
    );
  } catch (e) {
    return res.send({ error: true, text: "Bad data" });
  }
};

// likes posts
exports.like_post = async function(req, res) {
  try {
    const id = req.body.id.toString();
    // decode cookie
    const decoded = jwt.verify(req.cookies.token, "123");

    const data_like = await User_like.findOne({
      email: decoded.email,
      like_id: id
    }).exec();

    console.log(data_like);
    // if like
    if (data_like) {
      // unlike
      data_like.remove();
      res.send({ un_like: id });
    } else {
      // save like
      const user = new User_like({
        email: decoded.email,
        like_id: id
      });
      // save like
      user
        .save()
        .then(doc => {
          res.send(doc);
        })
        .catch(err => {
          console.error(err);
          res.send({ error: true, text: err.toString() });
        });
    }
  } catch (e) {
    res.send({ error: true, text: "Bad data" });
  }
};

// all likes post users
exports.all_likes_posts = async function(req, res) {
  // check data
  try {
    // decode cookie
    const decoded = jwt.verify(req.cookies.token, "123");

    const data_like = await User_like.find({ email: decoded.email }).exec();
    console.log(data_like);

    const data = [];

    data_like.map((item, i) => {
      return data.push(item.like_id);
    });

    console.log(data);
    giphy.id(data, function(err, res_data_gif) {
      const data_res = [];
      // "looping"
      res_data_gif.data.map((item, i) => {
        return data_res.push({
          gif_id: item.id,
          img: item.images.looping.mp4
        });
      });
      return res.send({ data_res });
    });
  } catch (e) {
    return res.send({ error: true, text: "Bad data" });
  }
};
