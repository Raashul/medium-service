"use strict";

const jwt = require("jsonwebtoken");

const mysql = require(__base + "/app/modules/common/mysql");
const config = require(__base + "/app/config/config");
const bcrypt = require("bcryptjs");

//Local Init Strategy for Signup
module.exports.initlocal = (request_id, data) => {
  return new Promise((resolve, reject) => {
    if (
      !data.email == "" ||
      !data.password == "" ||
      !data.confirmPassword == ""
    ) {
      resolve();
    } else {
      reject({
        error: { code: "400", message: "Missing required attributes" }
      });
    }
  });
};

//Local Strategy for password check
module.exports.passwordcheck = (request_id, data) => {
  return new Promise((resolve, reject) => {
    if (data.password == data.confirmPassword) {
      resolve();
    } else {
      reject({ error: { code: "400", message: "Password mistmatch error" } });
    }
  });
};

// Google Strategy for Signup
module.exports.init = (request_id, data) => {
  return new Promise((resolve, reject) => {
    if (data.email) {
      resolve();
    } else {
      reject({ code: 103.1, message: "Missing parent attribute" });
    }
  });
};

module.exports.checkIfUserExists = (request_id, data) => {
  return new Promise(async (resolve, reject) => {
    const queryString = "SELECT * FROM users WHERE email = ?;";
    try {
      let result = await mysql.query(queryString, [data.email]);
      if (result.length == 0) {
        resolve();
      } else {
        reject({ error: { code: 400, message: "User Already Exists" } });
      }
    } catch (e) {
      reject({ error: { code: 102, message: e.message } });
    }
  });
};

module.exports.insertIntoUsersTable = (request_id, body) => {
  return new Promise(async (resolve, reject) => {
    const queryString = "INSERT INTO users SET ?;";
    try {
      let result = await mysql.query(queryString, [body]);
      if (result.affectedRows == 1) {
        resolve(body.email);
        console.log("added user with email ", body.email);
      } else {
        reject({ error: { code: 103.4, message: "Failure to insert." } });
      }
    } catch (e) {
      reject({ error: { code: 102, message: e.message } });
    }
  });
};

//hashing the password for the manual entering of the user
module.exports.hashpassword = async (request_id, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err)
        reject({ error: { status: 500, message: "Internal Server error" } });
      bcrypt.hash(password, salt, (err, hash) => {
        if (err)
          reject({ error: { status: 500, message: "Internal Server error" } });
        resolve(hash);
      });
    });
  });
};

//generate jwt token
module.exports.generateToken = async (request_id, result) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(result);
      let payload = {
        id: result.id,
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email
      };
      console.log("generating token");

      let token = await jwt.sign(payload, config.jwt.cert);
      resolve(token);
    } catch (e) {
      reject({ code: 102, message: { message: e.message } });
    }
  });
};
