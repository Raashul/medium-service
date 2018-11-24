"use strict";

const passport = require("passport");

const signUpModule = require(__base + "/app/modules/registration/signup");
const response = require(__base + "/app/modules/common/response");

module.exports.signup = async (req, res) => {
  try {
    const body = req.body;
    await signUpModule.init(req.request_id, body);
    //await signUpModule.validation(req.request_id, body);
    await signUpModule.checkIfUserExists(req.request_id, body);
    await signUpModule.insertIntoUsersTable(req.request_id, body);
    response.success(req.request_id, body, res);
    //do stuff here for response
  } catch (e) {
    console.log("error", e);
  }
};

module.exports.login = async (req, res) => {
  try {
    const body = req.body;
    await loginModule.init(req.request_id, body);
    await loginModule.verify(req.request_id, body);
    response.success(req.request_id, body, res);
    //do stuff here for response
  } catch (e) {
    response.failure(req.request_id, e, res);
  }
};

module.exports.googleSignUp = async (req, res) => {
  try {
    const { id, provider, emails, name, photos } = req.user.profile;

    const user = {
      google_id: id,
      first_name: name.givenName,
      last_name: name.familyName,
      email: emails[0].value,
      profile_pic: photos[0].value
    };

    await signUpModule.init(req.request_id, user);

    const isUser = await signUpModule.checkIfUserExists(req.request_id, user);

    if (!isUser) {
      var useremail = await signUpModule.insertIntoUsersTable(
        req.request_id,
        user
      );
    } else {
      res.send("User already exists");
    }
    user.id = useremail;
    let token = await signUpModule.generateToken(req.request_id, user);
    response.success(req.request_id, { token: token }, res);
    res.send("Success login");
  } catch (e) {
    response.failure(req.request_id, e, res);
  }
};
