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