'use strict';

const response = require(__base + '/app/modules/common/response');


const homeModule = require( __base  + '/app/modules/home/getRecent');
const featuredModule = require(__base  +  '/app/modules/home/featured');


module.exports.getHome = async (req, res) => {
  try {

    //get recent posts
    let posts = await homeModule.getRecentPosts();
  
    //get featured posts
    let featuredPosts = await featuredModule.getFeaturedPost();

    if(posts && featuredPosts){
      let response_body =  {
        posts: posts,
        featured_posts: featuredPosts
      }
      console.log('response_body', response_body);
      res.json(response_body);
    }

  } catch(e) {
    console.log('error', e.message);
  }
}