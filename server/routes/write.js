// const db = require('../db');
const router = require('express').Router();
const controller = require('./../controller');

router.get('/write', controller.write.get);
router.post('/write', controller.write.post);

module.exports = router;

// module.exports = async(req, res) => {
//     let title, content, username;
//     title = req.body.post_title;
//     content = req.body.post_content;
//     username = req.body.userName;

//     res.send('글 작성 완료')
//     console.log(title, content, username)

//     let sql = 'insert into board (title, content, userName, created_at) values (?, ?, ?, NOW())';
//     let params = [title, content, username];
//     db.query(sql, params, (err, rows, fields) => {
//         if(err) console.log(err);
//     })
// }


