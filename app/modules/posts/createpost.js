'use strict'

const uuid = require('uuid/v4');

const mysql = require(__base + '/app/modules/common/mysql.js');


module.exports.validation = (request_id, data) => {
	return new Promise( (resolve, reject) => {
		
		if(data.title && data.body && data.category && data.claps >= 0){
			resolve();
		}
		else {
			console.log('rejecting');
			reject({ code: 103.1, message: 'Parent attributes validation.' });
		}
	})
}

module.exports.post = (request_id, data, user_id) => {
	return new Promise(async (resolve, reject) => {

		
		const query = "INSERT INTO `posts` SET ?; "

		const { title, body, claps, category } = data;
		
		const queryBody = {
			post_id : uuid(),
			title,
			user_id : user_id,
			body,
			claps,
			category
		}
		
		try{
			let result = await mysql.query(query, [queryBody]);
			resolve(result);
		}
		catch (e){
			console.log(`Opps! Something went wrong ${e.message}`);
			reject({ code: 103.3, message: 'Failure to insert.' })
		
		}
	})
}