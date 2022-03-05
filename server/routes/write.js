const express = require('express');
const router = express.Router();
const { Board } = require('../models');

router.post('/', async (req, res, next) => {
    console.log(req.body)
    console.log(Board);

    const posts = await Board.create({
        title: req.body.title,
        content: req.body.content,
        userName: req.body.userName
    })

    res.status(201).json(posts);
});

module.exports = router;
