var mysql = require('mysql');
var connection = mysql.createConnection({  
  host : '127.0.0.1',
  user : 'root',
  password : '1234',
  port : 3307,
  database : 'Mangobeer'
})
connection.connect();

module.exports = async(req, res) => {
    let title, content, username;
    title = req.body.post_title;
    content = req.body.post_content;
    username = req.body.userName;

    res.send('글 작성 완료')
    console.log(title, content, username)

    let sql = 'insert into board (title, content, userName, created_at) values (?, ?, ?, NOW())';
    let params = [title, content, username];
    connection.query(sql, params, function(err, rows, fields) {
        if(err) console.log(err);
    })
}


