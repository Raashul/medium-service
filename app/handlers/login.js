const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require(__base+ '/app/modules/common/mysql');
const bcrypt = require('bcryptjs');

module.exports.locallogin = (req, res, next) => {
    passport.authenticate('local', {failureRedirect: '/'})(req, res, next);
}

passport.use(new LocalStrategy({
    usernameField: 'email'}, async(email, password, done) =>{
        let querystring = "SELECT * FROM users WHERE email = ?"
        try{
            let result = await mysql.query(querystring, email);
            if(result.length !== 1) {
                console.log("More than one user conflict");
            }
            else{
                bcrypt.compare(password,result[0].password ,(err, matched)=> {
                    if (err){
                        console.log("There is an error", err)
                    }
                    if (matched){
                        console.log("Password has been verified");
                    }
                })
            }
        }
        catch(e){
            console.log(e);
        }       
    }
))