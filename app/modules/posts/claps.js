"use strict";
const mysql = require(__base + "/app/modules/common/mysql");

module.exports.validatePost = id => {
  return new Promise(async (resolve, reject) => {
    try {
      let queryString = "SELECT * FROM posts WHERE post_id = ? ";
      let result = await mysql.query(queryString, id);
      if (result.length == 0) {
        reject({ error: "404 post not found" });
      } else {
        if (result.length > 1) {
          reject({ error: "Post conflict. Too many post with same id." });
        } else {
          resolve(result);
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports.increaseClaps = data => {
  return new Promise(async (resolve, reject) => {
    try {
      let queryString = "UPDATE posts SET likes=? WHERE post_id=?";
      console.log(data.likes + 1);
      let result = await mysql.query(queryString, [
        data.likes + 1,
        data.post_id
      ]);
      if (result.changedRows == 1) {
        resolve(data.likes + 1);
      } else {
        reject({ error: { code: 500, error: "Internal Server Error" } });
      }
    } catch (e) {
      reject(e);
    }
  });
};
