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
        // res.json(rows);
        // console.log(rows);

        console.log(rows.length)
        for(let i=0; i<rows.length; i++) {
          console.log(rows[i].title, rows[i].content, rows[i].userName ,rows[i].created_at)
        }

        res.send('<a href=http://localhost:4000/forum/id=' + rows[0].id + '>' +  "1." + rows[0].title + '</a>')
    })
}
