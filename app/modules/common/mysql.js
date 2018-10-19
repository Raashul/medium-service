'use strict';

const mysql = require('mysql');

const DBPool = require(__base + '/app/init/mysql').getDBPOOL;

module.exports.query = (query, values) => {
  return new Promise( (resolve, reject) => {
    DBPool().getConnection(function(err, connection){
      if(err){
        //connection.release();
        console.log(err);
        reject(err);
      } else {
        const sql = mysql.format(query, values);
        const database_call = connection.query(sql, function(error, results, fields){
          connection.release();
          if(error) reject(error);
          console.log(results);
          resolve(results);
        })
      }

    })
  })
}