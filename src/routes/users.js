const express = require("express");

const router = express.Router();

const userCont = require("../controllers/user_reg");

/* routing users */
router.post("/user", userCont.reg_user);

router.post("/login_user", userCont.login_user);

router.get("/user_logout", userCont.logout_user);

router.get("/login_page", userCont.most_login);

module.exports = router;
