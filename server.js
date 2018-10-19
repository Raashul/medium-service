global.__base = __dirname;
require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')

const app = express();

const config = require(__base + '/app/config/config');


const request_id = require(__base + '/app/init/requestID').cuidRequestID;

//middlewares
app.use(morgan('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(request_id);


//initialize routes
require(__base + '/app/routes/index')(app);

app.get('/', (req, res) => {
  res.send('Hello from server');
})

// app.post('/test', (req, res) => {
//   console.log(req.request_id);
//   console.log(req.body);
// })

// app.get('/profile/a', (req,res) => {
//   const test  = {a: "good job"}
//   res.json(test);
// })

// start listening to port
const server = app.listen(config.app.port, () => {
  console.log(`Node app started at: ${server.address().port}.`);
});

module.exports = server;
