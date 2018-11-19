'use strict';

const jwt = require('jsonwebtoken');

const config = require(__base + '/app/config/config');
const response = require(__base + '/app/modules/common/response');

module.exports.authCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const authInfo = await authenticateToken(req.request_id, token);
    req.authInfo = authInfo;
    return next();
  } catch(e) {
    response.failure(req.request_id, e, res);
  }
}

function authenticateToken(request_id, token) {
  return new Promise( (resolve, reject) => {
    if(token) {
      console.log('received token ', token);
      jwt.verify(token, config.jwt.cert, (err, decoded) => {
        if(err) {
          reject({code: 105, custom_message: 'Failed to authorize token'})
        }
        else {
          const authInfo = {
            token,
            tokenData: decoded
          }
          console.log('resolved token');
          resolve(authInfo);
        }
      })
    } else {
      reject({code: 105, custom_message: "Authentication code not provided"})
    }
  })
}