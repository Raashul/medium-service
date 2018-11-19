'use strict'

const getPosts = require(__base + '/app/modules/posts/getpost.js');
const createPosts = require(__base + '/app/modules/posts/createpost.js');

module.exports.createPost = async (req, res) => {
	const body = req.body;
	console.log(req.authInfo)
	body.user_id = req.authInfo.tokenData.id;
	try{
		await createPosts.validation(req.request_id, body);
		
		let success = await createPosts.createPost(body);
		if (success.affectedRows == 1){
			let result = {code:200, message:"Post was sucessfully added"};
			res.json(result);
		}
		else{
			result = {code:500, message:"Opps! Something went wrong"};
			res.json(result)
		}
	} catch(e){
		console.log(`Opps! Something went wrong ${e}`);
	}
}

module.exports.getPost = async (req, res)  => {
	console.log(req.authInfo);
	try {
		let post = await getPosts.getPost(5);
		const postObj = { title: post.title, body: post.body, images: post.images, likes: post.likes, post_date: post.post_date,
											update_date: post.update_date, user: post.user_id } 
		res.json(postObj);
	}
	catch(e){
		console.log(`Opps! Something went wrong ${e}`);
	}
}