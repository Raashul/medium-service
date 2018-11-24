'use strict';

const uuid = require('uuid/v4');

const infoModules = require(__base + '/app/modules/profile/info')
const response = require(__base + '/app/modules/common/response');
const bookmarkModule = require(__base + '/app/modules/profile/bookmark');

module.exports.getInfo = async function(req, res){
  try {
  
    let profileInfo = await infoModules.details(2);    
    const test  = {first_name: profileInfo.first_name, last_name: profileInfo.last_name}
    res.json(test);
    

  } catch(e){

  }

}

//set bookmarks

module.exports.setBookmark = async function(req, res) {

  try {
    //create unique bookmark id for user
    const body = req.body;
    body.user_id = req.authInfo.tokenData.id;
    
    //validate that post id is provided.
    await bookmarkModule.validation(req.request_id, body);

    //push bookmark id into profile table
    await bookmarkModule.addBookmark(req.request_id, body);

    response.success(req.request_id, body, res);

  } catch (e) {
    response.failure(req.request_id, e, res);
  }
}
