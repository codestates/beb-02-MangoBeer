var express = require('express');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var {sequelize} = require('./models');

var app = express();

sequelize.sync();

app.listen(4000, () => {
    console.log(`🚀  server running... http://localhost:${4000}`)
  })