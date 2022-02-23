import express from "express";
import mysql from "mysql"

const password = process.env.DATABASE_PASSWORD;

const app = express();
const port = 3838;
const con = mysql.createConnection({
  // mysql 연결
  host: "localhost",
  user: "root",
  password: password,
  database: "MangoBeer_DB",
})


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
  let reqUserName, reqPassword;
  reqUserName = req.body.username;
  reqPassword = req.body.password;
  */

  /*
      1. DB에서 username 일치하는것 있는지 확인
      2. 
  */
  const username = req.body.username;
  const password = req.body.password;

  con.query(
    `select password from user where username = "${username}"`,
    (err, result) => {
      if(err) throw err
      console.log(result)
      
      if(result === NULL) {   // username 일치하는게 없다면 false 전송
        console.log(`로그인 실패 : 일치하는 username이 없습니다!`);
        res.send(false);
      } else {   // username 일치하는게 있다면 패스워드 확인.
        if(result === password) res.send(ture)
        else res.send(false); //  -> 비밀번호가 달라 재시도 필요 관련 내용 확인필요.
      }

    }
  );





  // user에서 find로 userName을 찾고,
  User.findOrCreate({
    where: {
      userName: reqUserName
    },
    default: {
      password: reqPassword
    }
  })
  .then(([user, created]) => {
    if (!created) {
      // 있으면 있다고 응답
      res.status(409).send("User exists");
    // 없으면 DB에 저장
    } else {
      // 니모닉코드 생성  
      let mnemonic;
      mnemonic = lightwallet.keystore.generateRandomSeed();
      // 생성된 니모닉코드와 password로 keyStore, address 생성
      lightwallet.keystore.createVault({
        password: reqPassword, 
        seedPhrase: mnemonic,
        hdPathString: "m/0'/0'/0'"
      },
      function (err, ks) {
        ks.keyFromPassword(reqPassword, function (err, pwDerivedKey) {
          ks.generateNewAddress(pwDerivedKey, 1);
          
          let address = (ks.getAddresses()).toString();
          let keyStore = ks.serialize();

          User.update({
            password: reqPassword,
            address: address,
            privateKey: mnemonic
          }, {
            where: {
              userName: reqUserName
            }
          })
          .then(result => {
            // 주소를 보여준다
            res.json(address);
          })
          .catch(err => {
            console.error(err);
          })
        });
      });
    }
  })
});