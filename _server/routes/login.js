const mysql =require( "mysql");

var connection = mysql.createConnection({  
  //host : '127.0.0.1',
  host : 'localhost',
  user : 'root',
  password : '1234',
  port : 3307,
  database : 'Mangobeer'
})

connection.connect((err) => {
  if(err) console.log("err : "+ err);
  console.log("login_DB 연결완료")
});

module.exports = async(req, res) => {
  console.log('post 진입 완료!');
  
  const username = req.body.username;
  const password = req.body.password;

  console.log(username+ " : "+password)

  let sql = 'SELECT password FROM users WHERE userName = ?';
  let params = username;

  connection.query(sql, params, (err, result, fields) => {
      //if(err) throw err
      if(err) console.log("err : "+ err);
      console.log("result : "+result);

      if(result.length !== 0) {   // username 일치하는게 있다면 패스워드 확인.
        result = result[0].password;
        console.log("password : "+ result+ " , pw : "+ password)
        if(result == password) {
          console.log("패스워드가 일치.");
          res.send("pw_true")
        } else {
          console.log("패스워드가 일치하지 않음.");
          res.send("pw_false"); //  -> 비밀번호가 달라 재시도 필요 관련 내용 확인필요.
        }
      } else {   // username 일치하는게 없다면 회원가입진행
        console.log("username이 일치하지 않음.");
        res.send("user_false");
      }
    }
  );
};