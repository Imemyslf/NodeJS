const User = require("../models/user");
const bcrypt = require("bcryptjs");
exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  console.log("Message ", message);
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
    // isAuthenticated: false,
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  console.log("Message ", message);
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
    // // isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((userDoc) => {
      console.log("\n\n userDoc in PostLogin: \n", userDoc);
      if (!userDoc) {
        req.flash("error", "Invalid email or password");
        return res.redirect("/login");
      }
      return bcrypt
        .compare(password, userDoc.password)
        .then((doMatch) => {
          console.log("\n\n domatch: ", doMatch);
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = userDoc;
            console.log("\n\n req.session: \n", req.session);
            return req.session.save((result) => {
              console.log("\n\n Result savingSession: \n", result);
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid email or password");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log("\n\n PostLogin bcrypt catch block: \n", err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log("\n\n Error in postLogIn: \n", err));
};

exports.postSignup = (req, res, next) => {
  // console.log("\n\n Error in postCartDeleteProduct: \n", err);
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "E-mail already exists please pick a new email");
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashPassword) => {
          const user = new User({
            email: email,
            password: hashPassword,
            cart: { items: [] },
          });
          console.log("\n\n User Inserted: \n", user);
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log("\n\n Postsignup err: \n", err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log("\n\n Error in postLogout: \n", err);
    res.redirect("/");
  });
};
