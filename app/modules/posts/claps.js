"use strict";
const mysql = require(__base + "/app/modules/common/mysql");

module.exports.increaseLikes = data => {
  return new Promise(async (resolve, reject) => {
    queryString = "UPDATE posts SET likes=? WHERE post_id=?";
    try {
      let result = await mysql.query(queryString, [
        data.likes + 1,
        data.post_id
      ]);
      if (result.changedRows == 1) {
        resolve(data.likes + 1);
      } else {
        reject({ error: "Oops something went wrong." });
      }
    } catch (e) {
      reject(e);
    }
  });
};
