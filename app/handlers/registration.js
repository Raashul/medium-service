'use strict';

const signUpModule = require(__base + '/app/modules/registration/signup');

module.exports.signup = async (req, res) => {
  try{
    const body = req.body;
    await signUpModule.init(req.request_id, body);
    //await signUpModule.validation(req.request_id, body);
    await signUpModule.checkIfUserExists(req.request_id, body);
    console.log('success');

  } catch(e){
    console.log('error', e);
  }

}