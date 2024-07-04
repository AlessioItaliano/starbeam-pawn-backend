require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

const { Db_URL, PPRT = 3000 } = process.env;

mongoose
  .connect(Db_URL)
  .than(() => {
    app.listen(PORT);
    console.log('Connected');
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });
