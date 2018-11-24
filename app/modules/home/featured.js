'use strict';

const mysql = require(__base + '/app/modules/common/mysql.js');

module.exports.getFeaturedPost = () => {
  return new Promise( async (resolve, reject) => {
    try {
      const query = 'SELECT * FROM posts ORDER BY claps DESC LIMIT 3';
      let result = await mysql.query(query);

      if(result.length > 0){
        resolve(result)
      } else {
        reject({ code: 101, message: 'No featured post found.' })
      }
    } catch(e) {
      reject({ code: 101, message: 'No featured post found.' })
    }
  }) 
}



//insert into featured table
