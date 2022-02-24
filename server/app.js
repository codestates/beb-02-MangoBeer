const express = require("express");
const mysql =require( "mysql");
const bodyParser = require('body-parser')
const cors = require('cors')
const lightwallet = require("eth-lightwallet");

const pw = process.env.DATABASE_PASSWORD;

const app = express();
const port = 3838;
const con = mysql.createConnection({
  // mysql 연결
  host: "localhost",
  user: "root",
  password: '1234',
  database: "MangoBeer_DB",
})

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());
 
con.connect(function (err) {
  if (err) throw err;
  // 포트로 서버 오픈
  app.listen(port, () => {
      console.log(`DB연결성공 and port : ${port} 구동중!`);
  });
});



app.post('/', async(req,res) => {
  // 포스트맨에서 userName, password를 넣으면
  
  /*
      1. DB에서 username 일치하는것 있는지 확인
        a. 있다면 password 일치여부 확인후 전송
        b. 없다면 회원가입후 db 저장.
  */
  console.log('post 진입 완료!');
  
  const username = req.body.username;
  const password = req.body.password;

  // `SELECT password FROM users WHERE userName = "${username}"`,

  con.query(
    `SELECT password FROM users WHERE userName = "${username}"`,
    (err, result) => {
      if(err) throw err
      //console.log("result : "+JSON.parse(result[0]))
      console.log("result : "+result);
      

      if(result.length !== 0) {   // username 일치하는게 있다면 패스워드 확인.
        //result = JSON.parse(result[0].password);
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
      }  //else 닫음
    }
  );
});


app.post('/signup', async(req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(` 회원가입 진행합니다.`);
  // 니모닉코드 생성  
  let mnemonic = lightwallet.keystore.generateRandomSeed();
  // 생성된 니모닉코드와 password로 keyStore, address 생성
  lightwallet.keystore.createVault({
    password: password, 
    seedPhrase: mnemonic,
    hdPathString: "m/0'/0'/0'"
  },
  function (err, ks) {
    ks.keyFromPassword(password, function (err, pwDerivedKey) {
      ks.generateNewAddress(pwDerivedKey, 1);
      
      let address = (ks.getAddresses()).toString();
      let keyStore = ks.serialize();

      con.query(`INSERT INTO users(userName, password, address, privateKey) VALUES("${username}", "${password}", "${address}", "${mnemonic}")`,
        function (err, result) {
          if (err) throw err;
          console.log("회원가입 완료");
          res.send(address);   // 회원가입 완료관련 어떻게 보내지?????!!!!
        }
      )

      
    })
  });
})