const mysql = require(__base + '/app/modules/common/mysql');

module.exports.getPost = (post_id) => {
    return new Promise( async (resolve, reject) => {
        const query = `SELECT * FROM posts WHERE post_id = ?;`;
        try {
            console.log(`You are searching the post with id ${post_id}`);
            let result = await mysql.query(query, [post_id]);
            console.log(result);
            if (result.length == 1){
                resolve(result[0])
            }
           
            else{
                reject({ code: 103, custom_message: 'Conflict with the post_id.' })
            }
        }
        catch (e){
            console.log(`Opps! Something went wrong ${e}`);
            reject({ code: 103, message: { message: e.message, stack: e.stack } });
        }
    });
  };