var express = require('express');
var {sequelize} = require('./models');
var bodyParser = require('body-parser')
var cors = require('cors')

var app = express();

sequelize.sync();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());

app.use('/', require('./routes/index'));

app.listen(4000, () => {
    console.log(`🚀  server running... http://localhost:${4000}`)
  })

