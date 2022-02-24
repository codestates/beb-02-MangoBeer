const router = require('express').Router();
const controller = require('./../controller');

router.get('/forum', controller.forum.get);

module.exports = router;
