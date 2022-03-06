/* global BigInt */

const express = require('express');
const router = express.Router();
const { Transaction, User } = require('../models');
const sequelize = require("sequelize");
const Web3 = require("web3");
const Op = sequelize.Op;

const abiDecoder = require('abi-decoder'); 
const erc20abi = require('../contracts/erc20abi');
abiDecoder.addABI(erc20abi);

router.get('/', (req, res, next) => {
  const {address} = req.query;
  console.log('주소 333 : '+address);

  if(address == undefined) {
    Transaction.findAll()
      .then((tx) => {
        console.log('tx 1 : '+tx);
        res.status(200).json(tx);
      });
  }
  else { // address가 parameter로 들어왔다면
    if(req.body.address === undefined) {
      res.status(200).json();
    } else {
      Transaction.findAll({
        where: {
          [Op.or]: [
            {from: address},
            {to: address}
          ]
        }
      })
      .then((tx) => {
        console.log('tx 2 : '+tx);
        res.status(200).json(tx);
      })
    }
  }

});

router.get('/withAddr', async (req, res, next) => {
  const {address} = req.query;

  const txs = await Transaction.findAll();

  let arr = [];

  for (let t of txs) {
    const input = t.input;
    const id = t.id;
    const createdAt = t.createdAt;
    const blockNumber = t.blockNumber;
    const hash = t.hash;
    
    const decodedData = abiDecoder.decodeMethod(input);
    
    if(address != undefined){
      var addr1 = decodedData.params[0].value;
      var addr2 = decodedData.params[1].value
      if(addr1 != address && addr2 != address){
        continue;
      }
    }

    var {from, to, amount} = {from: '',to: '',amount: ''};

    if (decodedData.name == "mintToken"){

      const user = await User.findOne({
        where: {address: decodedData.params[0].value}
      })

      var balance = BigInt(decodedData.params[1].value);
      balance /= 1000000000000000000n
      balance = String(balance);

      from = 'server';
      to = user.userName;
      amount = balance;
    }

    else if (decodedData.name == "transferEach"){
      const fromUser = await User.findOne({
        where: {address: decodedData.params[0].value}
      })

      const toUser = await User.findOne({
        where: {address: decodedData.params[1].value}
      })

      var balance = BigInt(decodedData.params[2].value);
      balance /= 1000000000000000000n
      balance = String(balance);

      from = fromUser.userName;
      to = toUser.userName;
      amount = balance;
    }

    arr.push({id, blockNumber, hash, from, to, amount, createdAt});
  }

  res.status(200).json(arr);
  

});

module.exports = router;