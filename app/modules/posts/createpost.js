'use strict'
const uuid = require('uuid/v4');

const mysql = require(__base + '/app/modules/common/mysql.js');


module.exports.validation = (request_id, data) => {
	return new Promise( (resolve, reject) => {
		if(data.title && data.body && data.claps){
			resolve();
		}
		else {
			reject({ code: 103.1, message: 'Parent attributes validation.' });
		}
	})
}

module.exports.post = (request_id, data, user_id) => {
	return new Promise(async (resolve, reject) => {
		// const query = "INSERT INTO posts(title, body, images, likes, post_date, update_date, user_id)" +
		// 								"VALUES (?,?,?,?,null,null,?)";
		
		const query = "INSERT INTO `posts` SET ?; "
		
		const queryBody = {
			post_id : uuid(),
			title : data.title,
			user_id : user_id,
			body: data.body,
			claps: data.claps
		}
		
		try{
			let result = await mysql.query(query, [queryBody]);
			resolve(result);
		}
		catch (e){
			console.log(e.message);
			console.log(`Opps! Something went wrong ${e}`);
		}
	})
}