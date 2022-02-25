const express = require('express');
const router = express.Router();
const { Board } = require('../models');

// 글 전체 조회
router.get('/', (req, res, next) => {
    Board.findAll()
        .then((board) => {
            res.json(board);
        });
})

// board_id 를 통해 상세 페이지 보기
// let sql = `select * from board where id = (?)`;
// router.get('/{id}')  

module.exports = router;