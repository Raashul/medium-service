const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require(__base + '/app/config/config');


module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  passport.use(new GoogleStrategy({
    clientID: config.passport.clientID,
    clientSecret: config.passport.clientSecret,
    callbackURL: config.passport.callbackURL,
  },
    (token, refreshToken, profile, done) => {
      return done(null, {
          profile: profile,
          token: token
      });
  }));
};