'use strict'
const mysql = require(__base + '/app/modules/common/mysql.js');

module.exports.createPost = (data) => {
    return new Promise(async (resolve, reject) => {
        console.log(data)
        const query = "INSERT INTO posts(title, body, images, likes, post_date, update_date, user_id)" +
                        "VALUES (?,?,?,?,null,null,?)";
        try{
            let result = await mysql.query(query, [data.title,data.body, data.images, data.likes, data.user_id]);
            resolve(result);
        }
        catch (e){
            console.log(`Opps! Something went wrong ${e}`);
        }
      })
  }