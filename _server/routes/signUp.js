var mysql = require('mysql');
var lightwallet = require("eth-lightwallet");

var connection = mysql.createConnection({  
  //host : '127.0.0.1',
  host : 'localhost',
  user : 'root',
  password : '1234',
  port : 3307,
  database : 'Mangobeer'
})
connection.connect((err) => {
  if(err) throw err;
});

module.exports = async(req, res) => {
  let username = req.body.username;
  let password = req.body.password;

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
      let sql =`INSERT INTO users(userName, password, address, privateKey) VALUES("?", "?", "?", "?")`;
      let params =[username, password, address, mnemonic];

      con.query(sql, params, (err, result) => {
          if (err) throw err;
          console.log("회원가입 완료");
          res.send(address);
        }
      )

      
    })
  });
}