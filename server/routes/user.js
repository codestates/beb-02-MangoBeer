const express = require('express');
const router = express.Router();
const lightwallet = require("eth-lightwallet");
const { User } = require('../models');  

// 유저 전체 조회
router.post('/', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if(username === undefined || password === undefined) {
    console.log("username 혹은 password가 입력되지 않음.")
    res.send({isuser: "input_false"});
  }

  User.findAll({
    attributes: ['password','address'],
    where: {
      userName: username
    }
  })
    .then((result) => {
      console.log("user : "+result)
      if(result.length !== 0) {   // username 일치하는게 있다면 패스워드 확인.
        if(result[0].address !== undefined){
          var address = result[0].address;
        }
        result = result[0].password;
        
        if(result == password) {
          console.log("패스워드가 일치.");
          res.send({isuser: "pw_true", address: address})
        } else {
          console.log("패스워드가 일치하지 않음.");
          res.send({isuser: "pw_false"});
        }
      } else {   // username 일치하는게 없다면 회원가입진행해야함을 고지.
        console.log("username이 일치하지 않음.");
        res.send({isuser: "user_false"});
      } 
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
      let privateKey = ks.exportPrivateKey(address, pwDerivedKey);

      console.log('userName: '+username+
        '\n password: '+password+ '\n address : '+ address+'\n privateKey: '+mnemonic);

      User.create({
        userName: username,
        password: password,
        address: address,
        privateKey: privateKey
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