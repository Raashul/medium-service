const mysql = require(__base + "/app/modules/common/mysql");

module.exports.checkPost = id => {
  return new Promise(async (resolve, reject) => {
    queryString = "SELECT * FROM posts WHERE post_id = ? ";
    try {
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
