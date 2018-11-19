'use strict';

const infoModules = require(__base + '/app/modules/profile/info')

module.exports.getInfo = async function(req, res){
  console.log('inside profile');
  try {
  
    let profileInfo = await infoModules.details(2);
    console.log('profileInfo', profileInfo);
    
    const test  = {first_name: profileInfo.first_name, last_name: profileInfo.last_name}
    res.json(test);
    

  } catch(e){
    console.log(e);
  }

}