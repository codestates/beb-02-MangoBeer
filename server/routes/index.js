const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.sendFile('/Users/wonsungjun/Desktop/p2/beb-02-MangoBeer/server/public/write.html')
});

router.use('/', require('./user'));
router.use('/signup', require('./user'));

router.use('/forum', require('./forum'));
router.use('/write', require('./write'));

module.exports = router;