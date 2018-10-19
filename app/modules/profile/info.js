'use strict';

const mysql = require(__base + '/app/modules/common/mysql');
const config = require(__base + '/app/config/config');

module.exports.details = (user_id) => {
  return new Promise( async (resolve, reject) => {
    const query = `SELECT * FROM profile WHERE id = ?;`;
    try {
      console.log('searching', user_id);
      let result = await mysql.query(query, [user_id]);
      console.log('result', result);
      if(result.length === 1) {
          resolve(result[0]);
      } else {
        reject({ code: 103, custom_message: 'Issue with user.' })
      }
    } catch (e) {
      reject({ code: 103, message: { message: e.message, stack: e.stack } });
    }
  });
};