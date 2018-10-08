const express = require('express');
const morgan = require('morgan');

const app = express();


app.use(morgan('short'));

app.get('/', (req, res) => {
  console.log('first get request');
  res.send('Hello from server');
})


app.listen(3001, () => {
  console.log('starting app in port 3001');
})