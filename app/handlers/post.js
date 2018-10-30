'use strict'

const getPosts = require(__base + '/app/modules/posts/getpost.js');
const createPosts = require(__base + '/app/modules/posts/createpost.js');

module.exports.createPost = async (req, res) => {
    const body = req.body
    try{
        let success = await createPosts.createPost(body);
        if (success.affectedRows == 1){
            let result = {statusCode:200, description:"Post was sucessfully added"};
            res.json(result);
        }
        else{
            result = {statusCode:500, description:"Opps! Something went wrong"};
            res.json(result)
        }
    } catch(e){
        console.log(`Opps! Something went wrong ${e}`);
    }
  }

  module.exports.getPost = async (req, res)  => {
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