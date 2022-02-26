const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    // res.sendFile('/Users/wonsungjun/Desktop/p2/beb-02-MangoBeer/server/public/write.html')
    res.sendFile('/Users/seomingyun/VSworkspace/BEB_space/project/project_2/beb-02-MangoBeer/server/public/write.html') // 내 절대 경로 넣어주기
});

router.use('/', require('./user'));
router.use('/signup', require('./user'));

router.use('/forum', require('./forum'));
router.use('/write', require('./write'));
router.use('/comments', require('./comments'));
// router.use('/users', require('./user'));


module.exports = router;