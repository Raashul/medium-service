'use strict';

const signUpModule = require(__base + '/app/modules/registration/signup');
const loginModule = require(__base  + '/app/modules/registration/login');


module.exports.signup = async (req, res) => {
  try{
    const body = req.body;
    await signUpModule.init(req.request_id, body);
    //await signUpModule.validation(req.request_id, body);
    await signUpModule.checkIfUserExists(req.request_id, body);
    await signUpModule.insertIntoUsersTable(req.request_id, body);
    
    //do stuff here for response

  } catch(e){
    console.log('error', e);
  }
}

module.exports.login = async (req, res) => {
  try{
    const body = req.body;
    await loginModule.init(req.request_id, body);
    await loginModule.verify(req.request_id, body);
    console.log('success');

    //do stuff here for response

  } catch(e){
    console.log('error', e);
  }
}