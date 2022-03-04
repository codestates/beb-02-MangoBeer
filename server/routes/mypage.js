const express = require('express');
const router = express.Router();
const { Board } = require('../models');

// 내가 쓴 게시글 불러오기
router.get('/getPosts', (req, res, next) => {
    Board.findAll({
        where: {
            user_name: req.query.user_name
        }
    })
    .then((post) => {
        res.status(200).json(post);
    })
})

module.exports = router;