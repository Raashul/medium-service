const express = require('express');
const morgan = require('morgan');
global.__base = __dirname;

const app = express();


app.use(morgan('short'));

require(__base + '/app/routes/index')(app);


app.get('/', (req, res) => {
  console.log('base', __base);
  console.log('first get request');
  res.send('Hello from server');
})


app.listen(3001, () => {
  console.log('starting app in port 3001');
})