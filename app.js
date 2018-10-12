const express = require('express');
const morgan = require('morgan');
var fs = require('fs');
var path = require('path');

const app = express();

// log all the logs into the txt file called access.log
// write system in append mode. 
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

//setting up the logger
app.use(morgan('combined', { stream: accessLogStream }))


app.get('/', (req, res) => {
  console.log('first get request');
  res.send('<h2> Hello from server. Welcome to the medium client api');
})

// For heroku declaring a port number 
const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log('starting app in port 3003');
})