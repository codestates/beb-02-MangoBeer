const express = require('express');
const router = express.Router();
const { Comment } = require('../models');

router.get('/', (req, res, next) => {
    const {post_id} = req.query;

    if(post_id == undefined) {
        Comment.findAll()
        .then((comments) => {
            res.status(200).json(comments);
        });
    }
    else { // post_id가 parameter로 들어왔다면
        Comment.findAll({
            where: {
                post_id: post_id
            }
        })
        .then((comments) => {
            res.status(200).json(comments);
        })
    }

});

router.post('/', (req, res, next) => {

    Comment.create({
        userName: req.body.userName,
        comments: req.body.comments,
        post_id: req.body.post_id
    })
    .then((newComments) => {
        res.status(201).json(newComments);
    })
    .catch((err) => {
        res.status(400).json(err);
    })

});

module.exports = router;
