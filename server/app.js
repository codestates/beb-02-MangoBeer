<<<<<<< HEAD
<<<<<<< HEAD
// express 기본 모듈 불러오기
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const forumpage = require('./routes/forum')
const writepage = require('./routes/write')
const viewpage = require('./routes/view')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/write.html')
})

app.get("/view", viewpage);
app.get("/forum", forumpage)
app.post("/write", writepage)

app.listen(4000, () => {
  console.log(`server running... http://localhost:${4000}`)
})
=======
=======
>>>>>>> 801c8e9 (rename: server.js -> app.js 이름 변경)
import express from "express";

const app = express();
const port = 3000;

// 포트로 서버 오픈
app.listen(port, () => {
    console.log(`port : ${port} 구동중!`);
});
<<<<<<< HEAD
>>>>>>> 10dc929 (server express로 수정)
=======
=======
// express 기본 모듈 불러오기
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const forumpage = require('./routes/forum')
const writepage = require('./routes/write')
const viewpage = require('./routes/view')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/write.html')
})

app.get("/view", viewpage);
app.get("/forum", forumpage)
app.post("/write", writepage)

<<<<<<< HEAD
>>>>>>> ed7b93f (rename: server.js -> app.js 이름 변경)
<<<<<<< HEAD
>>>>>>> 801c8e9 (rename: server.js -> app.js 이름 변경)
=======
=======
app.listen(4000, () => {
  console.log(`server running... http://localhost:${4000}`)
})
>>>>>>> a70ee23 (feat: app.js 라우터 분리 작업)
>>>>>>> d82d0b8 (feat: app.js 라우터 분리 작업)
