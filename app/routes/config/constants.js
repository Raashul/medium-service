"use strict";

const routes = {
  profile: "/api/profile",
  signup: "/api/signup",
  login: "/api/login",
  home: "/api/home",
  googleSignUp: "/auth/google",
  googleCallback: "/auth/google/callback",
  posts: "/api/posts",
  clap: "/api/clap/:post_id"
};

module.exports = routes;
