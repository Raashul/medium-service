'use strict';
const config = require(__base + '/app/config/config');

//success response
module.exports.success = (request_id, body, res) => {
  console.log('sucess body');
  res.status(200).send(body);
}

//failure response
module.exports.failure = (request_id, error, res) => {

  try {
    let body;
    if(error && error.code && (error.message || error.custom_message)) {
      let internal_code = parseInt(error.code.toString().split('.')[0]);
      let message;
      let http_code;

      switch(internal_code) {
        case 103:
          http_code = 400;
          message = 'Parameter error.';
          body = responseBody(request_id, http_code, internal_code, message, error);
          res.status(http_code).send(body);
          break;
        
        case 102:
          http_code = 500;
          message = 'Internal server error';
          body = responseBody(request_id, http_code, internal_code, message, error);
          res.status(http_code).send(body);
          break;
        
          case 101:
          http_code = 401;
          message = 'Unauthorized.';
          body = responseBody(request_id, http_code, internal_code, message, error);
          res.status(http_code).send(body);
          break;

        case 105:
          http_code = 403;
          message = 'Invalid Access.';
          body = responseBody(request_id, http_code, internal_code, message, error);
          res.status(http_code).send(body);
          break;

        default:
          break;
      }

    } else {
      internalError(request_id, error, res);
    }
  } catch(e){
    internalError(request_id, error, res);

  }
}

let responseBody = (request_id, http_code, internal_code, message, body) => {
  let proxy_error_message = {
    error: {
      http_code: http_code,
      code: config.app.environment === 'production' ? internal_code : body.code,
      message: body.custom_message || message,
      parameters: body.parameters,
      internal: {
        id: request_id,
        code: internal_code,
        message: message
      }
    }
  };
  return proxy_error_message;
};


let internalError = (request_id, e, res) => {
  res.status(500).send({
    error: {
      http_code: 500,
      code: 102,
      message: 'Something went wrong',
      internal: {
        id: request_id,
        code: 102,
        message: 'Something went wrong'
      }
    }
  });
};
