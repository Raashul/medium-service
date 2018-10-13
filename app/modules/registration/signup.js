'use strict';

const mysql = require(__base + '/app/modules/common/mysql');

module.exports.init = (request_id, data) => {
  return new Promise((resolve, reject) => {
    console.log(data);
    //TODO: determine what data is needed
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
    const queryString = "SELECT email FROM users WHERE email = ?;";
    try{
      let result = await mysql.query(queryString, [data.email]);
      console.log('result length', result.length);
      if(result.length == 0){
        resolve();
      }
      else{
        reject({code: 103.4, message: 'User with same email exists already'})
      }
    } catch(e){
      reject({ code: 102, message: e.message });

    }
  })
}