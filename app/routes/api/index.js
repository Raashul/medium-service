'use strict';

const route = require(__base + '/app/routes/config/constants');
const profile = require(__base + '/app/handlers/profile');


exports = module.exports = (app) => {
  app.get(route.profile, profile.getInfo)
  console.log('after get')
}



