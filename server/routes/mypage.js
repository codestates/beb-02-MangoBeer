const express = require('express');
const router = express.Router();
const { Board, Contract, NftContract } = require('../models');

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

router.get('/getLatestContracts', async (req, res, next) => {
    const latestInfo = await Contract.findOne({
        order: [ ['create_at', 'DESC']],
    });

    if (latestInfo == null) {
        res.status(400).json({msg: 'Theres no contract info.'});
    }
    else {
        res.status(200).json({latestInfo, msg: 'Succeed in getting latest contract info.'});
    }

})

router.get('/getLatestNFTContracts', async (req, res, next) => {
    const latestInfo = await NftContract.findOne({
        order: [ ['create_at', 'DESC']],
    });

    if (latestInfo == null) {
        res.status(400).json({msg: 'Theres no contract info.'});
    }
    else {
        res.status(200).json({latestInfo, msg: 'Succeed in getting latest contract info.'});
    }

})

module.exports = router;