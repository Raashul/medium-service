'use strict';

const mysql = require(__base + '/app/modules/common/mysql');

module.exports.validation =(request_id, body) => {
  return new Promise( (resolve, reject) => {
    if(body) {
      resolve();
    } else {
      reject({ code: 103.1, message: 'Parent attributes validation.' });
    }
  })
}

module.exports.addBookmark = (request_id, body) => {
  return new Promise( async (resolve, reject) => {
    const { post_id, user_id } = body;
    const query =  'INSERT INTO bookmarks SET ?;'
    const queryBody = {
      post_id,
      user_id
    }

    try {
      let result = await mysql.query(query, [queryBody]);
      console.log(result);
      resolve();
    } catch(e){
        console.log(`Opps! Something went wrong ${e.message}`);
			  reject({ code: 103.3, message: 'Failure to insert.' })
    }

  })
}


