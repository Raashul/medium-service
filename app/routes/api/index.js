'use strict';

const  passport = require('passport');
const route = require(__base + '/app/routes/config/constants');
const profile = require(__base + '/app/handlers/profile');
const registration = require(__base + '/app/handlers/registration');
const auth = require(__base + '/app/init/auth');
const authorization = require(__base + '/app/routes/config/authorization');
const posts = require(__base + '/app/handlers/post');

exports = module.exports = (app) => {

  // google registration
  app.get(route.googleSignUp, passport.authenticate('google', {
    scope : ['profile', 'email'] 
  }));
  
  app.get(route.googleCallback, passport.authenticate('google', {failureRedirect: '/'}), registration.googleSignUp)

  //profile route
  app.route(route.profile)
    .get(authorization.authCheck, profile.getInfo)

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

  app.get('/api/test', authorization.authCheck, (req,res) => res.send('success'))

  //For the posts
    app.route(route.posts)
      .get(posts.getPost)
      .post(posts.createPost)

}





