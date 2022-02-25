const express = require('express');
const {sequelize} = require('./models');
const bodyParser = require("body-parser");  
const cors = require('cors');                
 
const app = express();
var port = 3306;                     
const db = require("./models");
var corsOptions = {                  // 추가
  //origin: "http://127.0.0.1:3306/"
  host: "127.0.0.1",
  port: 3306,
  user: 'root',
  password: '1234',
  database: "Mangobeer"
};

app.use(cors());  // 추가
app.use(bodyParser.json());  // 추가
app.use(bodyParser.urlencoded({ extended: false }));   // 추가

// sequelize.sync(); // Sequelize가 초기화 될 때 DB에 필요한 테이블을 생성하는 함수


// app.listen(port, () => {
//     console.log(`🚀  server running... http://localhost:${port}`)
//   })

app.use('/', require("./routes/user"));
app.use('/signup', require("./routes/user"))

  db.sequelize.sync().then(() => {
    app.listen(port, (err, res) => {
      console.log("DB연결 성공 및 port구동중");
    });
  });

  // app.post('/',(req,res)=> {
  //   return res.send('메롱')
  // })