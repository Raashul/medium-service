'use strict';

const passport = require('passport');
const route = require(__base + '/app/routes/config/constants');
const profile = require(__base + '/app/handlers/profile');
const signup = require(__base + '/app/handlers/signup');
const registration = require(__base + '/app/handlers/registration');
const auth = require(__base + '/app/init/auth');
const authorization = require(__base + '/app/routes/config/authorization');
const posts = require(__base + '/app/handlers/post');
const login = require(__base + '/app/handlers/login');
const home = require(__base + '/app/handlers/home');

exports = module.exports = (app) => {

  //LocalStrategy to Signup into the medium-client
  app.route(route.signup)
    .post(signup.sign);

  // google registration
  app.get(route.googleSignUp, passport.authenticate('google', {
    scope : ['profile', 'email'] 
  }));
  
  app.get(route.googleCallback, passport.authenticate('google', {failureRedirect: '/'}), registration.googleSignUp)

  //login route 
  app.route(route.login)
    .post(login.locallogin)

  //profile route
  app.route(route.profile)
    .get(authorization.authCheck, profile.getInfo)


  app.route(route.home)
    .get(home.getHome)

  //For the posts
  app.route(route.posts)
  .get(posts.getPost)
  .post(authorization.authCheck, posts.createPost)

  //bookmark routes
  app.route(route.bookmark)
    //.get(authorization.authCheck, profile.getBookmarks)
    .post(authorization.authCheck, profile.setBookmark)

}








