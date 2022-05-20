const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Load User model
const Markiting = require("../models/Markiting");
module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user
      Markiting.findOne({
        email: email,
      }).then((markiting) => {
        if (!markiting) {
          return done(null, false, { message: "That email is not registered" });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, markiting);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        });
      });
    })
  );

  passport.serializeUser(function (markiting, done) {
    done(null, markiting.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, markiting) {
      done(err, markiting);
    });
  });
};
