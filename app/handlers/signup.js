'use strict'
const response = require(__base + '/app/modules/common/response.js');
const signup = require(__base + '/app/modules/registration/signup.js');

module.exports.sign = async(req, res) => {
    let user = req.body
   try{
    let initlocal = await signup.initlocal(req.request_id, user);
    if (initlocal){
        let passwordcheck = await signup.passwordcheck(req.request_id, user);
        if (passwordcheck) {
            let userexist = await signup.checkIfUserExists(req.request_id,user);
            if (!userexist){
                let hashpassword = await signup.hashpassword(req.request_id, user.password);
                let querybody = {
                    email: user.email,
                    password: hashpassword
                }
                let result = await signup.insertIntoUsersTable(req.request_id, querybody);
                res.send({status:200, message:`Added user with result email address`});
            }
            else{
                res.json({code:101, message:"User Already Exists"});
            }
        }
        else{
            res.json({code:103, message:"passwords must match with each other"})
        }
    }
    else{
        res.json({code:103, message:"Require all of the fields. Missing Parameter"})
    }
}
   catch(e){
       response.failure(req.request_id,e,res)
   }
};