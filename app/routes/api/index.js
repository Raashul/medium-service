'use strict';

const  passport = require('passport');

const route = require(__base + '/app/routes/config/constants');
const profile = require(__base + '/app/handlers/profile');
const registration = require(__base + '/app/handlers/registration');
const auth = require(__base + '/app/init/auth');

const authorization = require(__base + '/app/routes/config/authorization');

exports = module.exports = (app) => {

  //registration
  // app.post(route.signup, registration.signup);
  // app.post(route.login, registration.login);

  // google registration
  app.get(route.googleSignUp, passport.authenticate('google', {
    scope : ['profile', 'email'] 
  }));
  
  app.get(route.googleCallback, passport.authenticate('google', {failureRedirect: '/'}), registration.googleSignUp)

  //profile route
  app.route(route.profile)
    .get(authorization.authCheck, profile.getInfo)

  //home route
  app.route(route.home)
    .get((req, res) => res.send("test success"))
}



