const express = require('express');
const router = express.Router();
const { Transaction } = require('../models');
//const { Op } = require('@sequelize/core');

router.get('/', (req, res, next) => {
  const {address} = req.query;

  if(address == undefined) {
    Transaction.findAll()
      .then((tx) => {
          res.status(200).json(tx);
      });
  }
  else { // address가 parameter로 들어왔다면
    Transaction.findAll({
          where: {
            [Op.or]: [
              {from: address},
              {to: address}
            ]
          }
      })
      .then((tx) => {
          res.status(200).json(tx);
      })
  }

});

module.exports = router;