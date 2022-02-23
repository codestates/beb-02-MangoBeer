// express 기본 모듈 불러오기
var express = require('express')
var app = express()
var port = 3001
var bodyParser = require('body-parser')
var cors = require('cors')

var mysql = require('mysql');
var connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '1234',
    port : 3307,
    database : 'Mangobeer'
})

connection.connect((err)=> {
    if(!err) {
        console.log('Connect')
    }
    else {
        console.log(err)
    }
});

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
});

// connection.end();    

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/write.html')
})

app.get('/forum', function(req, res) {
    res.send("글 조회 테이블")
})

app.post('/write', function(req, res) {
    let title, content, username;
    title = req.body.post_title;
    content = req.body.post_content;
    username = req.body.userName;

    res.send("글 작성 완료")
    console.log(title, content, username)
    
    let sql = 'INSERT INTO test (title, content, username) values (?, ?, ?)';
    let params = [title, content, username];
    connection.query(sql, params, function(err, rows, fields) {
        if(err) console.log(err);
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})







