const express = require('express');
const router = express.Router();
const { Transaction } = require('../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;

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

module.exports = router;