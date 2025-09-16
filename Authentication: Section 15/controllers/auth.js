const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

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
    oldInput: {
      email: "",
      password: "",
    },
    validationErrors: [],
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
    oldInput: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationErrors: [],
    // // isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
      },
      validationErrors: errors.array(),
    });
  }

  User.findOne({ email: email })
    .then((userDoc) => {
      console.log("\n\n userDoc in PostLogin: \n", userDoc);
      if (!userDoc) {
        return res.status(422).render("auth/login", {
          path: "/login",
          pageTitle: "Login",
          errorMessage: "Inalid email or password",
          oldInput: {
            email: email,
            password: password,
          },
          // validationErrors: [{ param: "email", param: "password" }],
          validationErrors: [],
        });
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
          return res.status(422).render("auth/login", {
            path: "/login",
            pageTitle: "Login",
            errorMessage: "Inalid email or password",
            oldInput: {
              email: email,
              password: password,
            },
            // validationErrors: [{ param: "email", param: "password" }],
            validationErrors: [],
          });
        })
        .catch((err) => {
          console.log("\n\n PostLogin bcrypt catch block: \n", err);
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log("\n\n Error in postLogIn: \n", err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postSignup = (req, res, next) => {
  // console.log("\n\n Error in postCartDeleteProduct: \n", err);
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const errors = validationResult(req);

  console.log("\n\n PostSignUp Errors\n", errors.array);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      },
      validationErrors: errors.array(),
      // // isAuthenticated: false,
    });
  }
  // User.findOne({ email: email })
  //   .then((userDoc) => {
  //     if (userDoc) {
  //       req.flash("error", "E-mail already exists please pick a new email");
  //       return res.redirect("/signup");
  //     }
  // return (
  bcrypt
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
    })
    // })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
  // );
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log("\n\n Error in postLogout: \n", err);
    res.redirect("/");
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  console.log("Message ", message);
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: message,
    // isAuthenticated: false,
  });
};
