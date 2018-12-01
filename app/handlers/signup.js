"use strict";
const response = require(__base + "/app/modules/common/response.js");
const signup = require(__base + "/app/modules/registration/signup.js");

module.exports.sign = async (req, res) => {
  let user = req.body;
  try {
    let initlocal = await signup.initlocal(req.request_id, user);
    let passwordcheck = await signup.passwordcheck(req.request_id, user);
    let userexist = await signup.checkIfUserExists(req.request_id, user);
    let hashpassword = await signup.hashpassword(req.request_id, user.password);
    let result = await signup.insertIntoUsersTable(req.request_id, {
      email: user.email,
      password: hashpassword
    });
    res.send({ code: 200, message: `Added user sucessfully` });
  } catch (e) {
    res.send(e);
  }
};
