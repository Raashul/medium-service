'use strict';

module.exports = {
  app: {
    port: process.env.PORT || 3001,
    environment: process.env.environment || 'local'
  },
  mysql : {
    db_host: process.env.MYSQL_DB_HOSTNAME,
    db_username: process.env.MYSQL_DB_USERNAME,
    db_password: process.env.MYSQL_DB_PASSWORD,
    db_database : process.env.MYSQL_DB_DATABASE,
    db_port: process.env.MYSQL_DB_PORT,
    db_sock: process.env.MYSSQL_DB_SOCK
  },
  passport : {
    clientID : process.env.PASSPORT_CLIENT_ID,
    clientSecret: process.env.PASSPORT_CLIENT_SECRET,
    callbackURL : process.env.PASSPORT_CALLBACK_URL
  },
  jwt : {
    cert: process.env.JWT_TOKEN_CERT
  }
}