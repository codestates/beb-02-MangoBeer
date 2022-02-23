var mysql = require('mysql');
var connection = mysql.createConnection({  
  host : '127.0.0.1',
  user : 'root',
  password : '1234',
  port : 3307,
  database : 'Mangobeer'
})
connection.connect();

let id =3;

module.exports = async(req, res) => {

    console.log(req.body)
    let sql = `select * from board where id = (?)`;
    let params = id;

    connection.query(sql, params, (err, rows, fields) => {
        res.json(rows);
    })

    // res.send("view page...")
}