'use strict';

const mysql = require(__base + '/app/modules/common/mysql');

module.exports.init = (request_id, data) => {
  return new Promise((resolve, reject) => {
    //TODO: determine what data is needed
    if(data.email){
      resolve();
    }
    else{
      reject({code: 103.1, message: 'Missing parent attribute'});
    }
  })
}


module.exports.verify = (request_id, data) => {
  return new Promise(async (resolve, reject) => {
    const queryString = "SELECT email FROM users WHERE email = ?;";
    try{
      let result = await mysql.query(queryString, [data.email]);
      console.log('result length', result.length);
      if(result.length == 1){
        resolve();
      }
      else{
        reject({ code: 101, message: 'Email not present in the database.' })
      }
    } catch(e){
      reject({ code: 102, message: e.message });
    }
  })
}

