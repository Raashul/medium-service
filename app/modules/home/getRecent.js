const mysql = require(__base + '/app/modules/common/mysql.js');

module.exports.getRecentPosts = () => {
  return new Promise( async (resolve, reject) => {
    try {
      const query = 'SELECT * FROM posts ORDER BY created_at DESC LIMIT 5';
      let result = await mysql.query(query);

      if(result.length > 0){
        resolve(result)
      }
    } catch(e) {
      console.log('error', e.message);
    }
  }) 
}