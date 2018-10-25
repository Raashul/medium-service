'use strict';

const route = require(__base + '/app/routes/config/constants');

const profile = require(__base + '/app/handlers/profile');
const registration = require(__base + '/app/handlers/registration');
const home = require(__base + '/app/handlers/home');

const  passport = require('passport');

exports = module.exports = (app) => {

  //registration
  app.post(route.signup, registration.signup);
  app.post(route.login, registration.login);

  app.route(route.profile)
    .get(profile.getInfo)
    // .post(profile.addInfo)
    // .put(profile.editInfo)

  app.route(route.home)
    .get((req, res) => res.send("test success"))

  app.route(route.home) //anything with api/home goes here.
    .get(home.test)
  app.get('/auth/google', passport.authenticate('google', {
    scope : ['profile', 'email'] 
  }));
  
  app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
      console.log('user here', req.user);
      console.log('sucess');
      res.send('Success login');
  
    }
  );
    

}



