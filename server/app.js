const express = require('express');
const {sequelize} = require('./models');
const bodyParser = require("body-parser");  
const cors = require('cors');                

const app = express();
                  
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));   // 추가
app.use(bodyParser.json({ limit: '1mb' }));  // 추가
app.use(cors());  // 추가

sequelize.sync(); // Sequelize가 초기화 될 때 DB에 필요한 테이블을 생성하는 함수

app.use('/', require("./routes/index"));

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors({
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
}));

app.listen(4000, () => {
    console.log(`🚀  server running... http://localhost:${4000}`)
  })