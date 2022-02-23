<<<<<<< HEAD
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
    let sql = 'SELECT * FROM board'
    connection.query(sql, (err, rows, fields) => {
        res.json(rows);
        console.log(rows);
    })
=======
module.exports = async(req, res) => {
    res.send("forum page...")
>>>>>>> d82d0b8 (feat: app.js 라우터 분리 작업)
}
