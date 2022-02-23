<<<<<<< HEAD
// mysql 설정 - 이거 라우터마다 설정해줘야하나?
=======
>>>>>>> d82d0b8 (feat: app.js 라우터 분리 작업)
var mysql = require('mysql');
var connection = mysql.createConnection({  
  host : '127.0.0.1',
  user : 'root',
  password : '1234',
  port : 3307,
  database : 'Mangobeer'
})
connection.connect();

<<<<<<< HEAD
// web3 모듈 불러오기 - 보류
// var Web3 = require('web3');
// var web3 = new Web3('HTTP://127.0.0.1:7545')
// web3.eth.getAccounts().then(accounts => console.log(accounts));

=======
>>>>>>> d82d0b8 (feat: app.js 라우터 분리 작업)
module.exports = async(req, res) => {
    let title, content, username;
    title = req.body.post_title;
    content = req.body.post_content;
    username = req.body.userName;

    res.send('글 작성 완료')
    console.log(title, content, username)

    let sql = 'insert into board (title, content, userName, created_at) values (?, ?, ?, NOW())';
    let params = [title, content, username];
<<<<<<< HEAD
    connection.query(sql, params, (err, rows, fields) => {
=======
    connection.query(sql, params, function(err, rows, fields) {
>>>>>>> d82d0b8 (feat: app.js 라우터 분리 작업)
        if(err) console.log(err);
    })
}


