'use strict';

const  passport = require('passport');

const route = require(__base + '/app/routes/config/constants');

const profile = require(__base + '/app/handlers/profile');
const registration = require(__base + '/app/handlers/registration');
<<<<<<< HEAD
const home = require(__base + '/app/handlers/home');

const  passport = require('passport');
=======
const auth = require(__base + '/app/init/auth');

const authorization = require(__base + '/app/routes/config/authorization');
>>>>>>> 47705d7f71ebac8b6b89494378da139b9ec1b772

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

<<<<<<< HEAD
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
=======

  //test
  app.get('/api/test', authorization.authCheck, (req,res) => res.send('success'))
>>>>>>> 47705d7f71ebac8b6b89494378da139b9ec1b772
    

}



