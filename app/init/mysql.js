'use strict';

const mysql = require('mysql');
const config = require(__base + '/app/config/config');

const DBPool = mysql.createPool({
  host: config.mysql.db_host,
  user: config.mysql.db_username,
  password: config.mysql.db_password,
  database: config.mysql.db_database,
  //port: config.mysql.db_port,
  connectionLimit: 10 //change this
})

module.exports.getDBPOOL = () => {
  return DBPool;
}
