const express = require('express');
const router = express.Router();
const { Board } = require('../models');

router.post('/', (req, res, next) => {
    console.log(req.body)
    console.log(Board);

    Board.create({
        title: req.body.title,
        content: req.body.content,
        userName: req.body.userName
    })
});

module.exports = router;
