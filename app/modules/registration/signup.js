'use strict';

const jwt = require('jsonwebtoken');

const mysql = require(__base + '/app/modules/common/mysql');
const config = require(__base + '/app/config/config');

module.exports.init = (request_id, data) => {
  return new Promise((resolve, reject) => {
    if(data.email){
      resolve();
    }
    else{
      reject({code: 103.1, message: 'Missing parent attribute'});
    }
  })
}


module.exports.checkIfUserExists = (request_id, data) => {
  return new Promise(async (resolve, reject) => {
    const queryString = "SELECT * FROM users WHERE email = ?;";
    try{
      let result = await mysql.query(queryString, [data.email]);
      if(result.length == 0){
        resolve(false);
      }
      else{
        resolve(true);
      }
    } catch(e){
      reject({ code: 102, message: e.message });

    }
  })
}

module.exports.insertIntoUsersTable = (request_id, body) => {
  return new Promise( async (resolve, reject) => {
    const queryString = 'INSERT INTO users SET ?;';
    try{
      let result = await mysql.query(queryString, [body]);
      if(result.affectedRows == 1){
        resolve(body.email);
        console.log('added user with email ', body.email);
      }
      else {
        reject({ code: 103.4, message: 'Failure to insert.' })
      }
    } catch (e) {
      reject({ code: 102, message: { message: e.message, stack: e.stack } });
    }
  })
}


//generate jwt token
module.exports.generateToken = async (request_id, result) => {
  return new Promise (async (resolve, reject) => {
    try {
      let payload = {
        id: result.id,
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email
      }
      console.log('generating token');

      let token = await jwt.sign(payload, config.jwt.cert);
      resolve(token);
    } catch(e){
      reject({ code: 102, message: { message: e.message } });
    }
  })
}