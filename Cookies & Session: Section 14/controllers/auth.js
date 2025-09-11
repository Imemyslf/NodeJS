const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  //   console.log("Cookie found", req.get("Cookie"));
  //   const isLoggedIn = req.get("Cookie").split("=")[1];
  console.log("isLoggedIn", req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
    // isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  //   req.isLoggedIn = true;
  //   res.cookie("loggedIn", "true");
  //   res.setHeader("Set-Cookie ", "loggedIn=true");
  User.findById("68c16108a42ee683f45a0d33")
    .then((user) => {
      req.session.isLoggedIn = true;
      console.log("User: ", user);
      req.session.user = user;
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.postLogOut = (req, res, next) => {
  req.session.destroy((err) => {
    console.log("err:", err);
    res.redirect("/");
  });
};
