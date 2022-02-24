const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.sendFile('/Users/wonsungjun/Desktop/p2/beb-02-MangoBeer/server/public/write.html')
});

router.use('/forum', require('./forum'));
router.use('/write', require('./write'));
router.use('/users', require('./users'));
router.use('/test', require('./test'));

module.exports = router;