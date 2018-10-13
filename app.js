require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
var fs = require('fs')
var path = require('path')
const mysql = require('mysql')

const app = express();

// log all the logs into the txt file called access.log
// write system in append mode. 
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

//setting up the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.get('/user/:id', (req, res) => {
  
  const connection = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name,
    port:process.env.db_port,
    socketPath: process.env.db_sock
  })

  connection.query("SELECT * FROM users", (err, rows, fields)=>{
    if (err) {
      console.log(`Got an error of ${err}`)
      res.send(`The error is ${err}`)
    }
    console.log("Fetched the user sucessfully.")
    res.json(rows)
  })
})


app.get('/', (req, res) => {
  console.log('first get request');
  res.send('<h2> Hello from server. Welcome to the medium client api');
})

// For heroku declaring a port number 
const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log('starting app in port 3003');
})
