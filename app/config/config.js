'use strict';

module.exports = {
  app: {
    port: process.env.port || 3001,
    environment: process.env.environment || 'local'
  },
  mysql : {
    db_host: process.env.MYSQL_DB_HOST,
    provisioning_db_username: process.env.MYSQL_DB_USERNAME,
    db_password: process.env.MYSQL_DB_PASSWORD,
    db_database : process.env.MYSQL_DB_DATABASE,
    db_port: process.env.MYSQL_DB_PORT,
  }
}