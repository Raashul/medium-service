'use strict';

const mysql = require('mysql');

const DBPool = require(__base + '/app/init/mysql').getDBPOOL;

module.exports.query = (query, values) => {
  return new Promise( (resolve, reject) => {
    DBPool().getConnection(function(err, connection){

      if(err){
        console.log(err);
        reject(err);
      } 
      else {
        console.log("Printing form mysql file ", mysql.format(query,values));
        const sql = mysql.format(query, values);
        const database_call = connection.query(sql, function(error, results, fields){
          connection.release();
          console.log(error);
          if(error) reject(error);
          resolve(results);
        })
      }
    })
  })
}