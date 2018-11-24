const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mysql = require(__base + "/app/modules/common/mysql");
const bcrypt = require("bcryptjs");
const signupModule = require(__base + "/app/modules/registration/signup");

module.exports.locallogin = (req, res, next) => {
  passport.authenticate("local", { failureRedirect: "/" })(req, res, next);
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      let querystring = "SELECT * FROM users WHERE email = ?";
      try {
        let result = await mysql.query(querystring, email);
        if (result.length !== 1) {
          console.log("More than one user conflict");
        } else {
          bcrypt.compare(password, result[0].password, async (err, matched) => {
            if (err) {
              console.log("There is an error", err);
            }
            if (matched) {
              console.log("I am verifying");
              console.log(result[0]);
              let token = await signupModule.generateToken(
                req.request_id,
                result[0]
              );
              console.log(token);
            }
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  )
);
