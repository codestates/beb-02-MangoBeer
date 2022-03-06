const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    // res.sendFile('/Users/wonsungjun/Desktop/p2/beb-02-MangoBeer/server/public/write.html')
    // res.sendFile('/Users/seomingyun/VSworkspace/BEB_space/project/project_2/beb-02-MangoBeer/server/public/write.html') // 내 절대 경로 넣어주기
});

router.use('/', require('./user'));
router.use('/signup', require('./user'));

router.use('/forum', require('./forum'));
router.use('/write', require('./write'));
router.use('/comments', require('./comments'));
router.use('/txList', require('./token'));
router.use('/mypage', require('./mypage'));

// ERC20 API
router.use('/deployContract', require('./erc20/deployContract'));
router.use('/ethFaucet', require('./erc20/ethFaucet'));
router.use('/forEther', require('./erc20/forEther')); // 여러 기타 api들 모아놓음
router.use('/mintToken', require('./erc20/mintToken')); // erc20 토큰 발행
router.use('/transferEach', require('./erc20/transferEach')); // erc20 토큰 유저들끼리 교환

// ERC721 API
router.use('/deployNFT', require('./erc721/deployNFT'));
router.use('/mintNFT', require('./erc721/mintNFT'));
// router.use('/transferNFT', require('./erc721/transferNFT'));
// router.use('/getNFT', require('./erc721/getNFT'));


module.exports = router;