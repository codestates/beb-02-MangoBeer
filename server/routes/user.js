const express = require('express');
const router = express.Router();
const lightwallet = require("eth-lightwallet");
const { User } = require('../models');  

// 유저 전체 조회
router.post('/', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username + " : "+password)

  User.findAll({
    attributes: {
      password
    },
    where: {
      userName: username
    }
  })
    .then((result) => {
      console.log("user : "+result)
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

      //res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    })
});

// 유저 등록
router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(` 회원가입 진행합니다.`);
  // 니모닉코드 생성  
  let mnemonic = lightwallet.keystore.generateRandomSeed();
  console.log('mneminic : '+ mnemonic);

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
      console.log('userName: '+username+
        '\n password: '+password+ '\n address : '+ address+'\n privateKey: '+mnemonic);

      User.create({
        userName: username,
        password: password,
        address: address,
        privateKey: mnemonic
      })
      .then((result) => {
        console.log("회원정보 저장완료");
        res.status(200).json(address);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      })
    })
  });
})


module.exports = router;