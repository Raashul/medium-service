'use strict';

const route = require(__base + '/app/routes/config/constants');
const profile = require(__base + '/app/handlers/profile');
const registration = require(__base + '/app/handlers/registration');

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

}



