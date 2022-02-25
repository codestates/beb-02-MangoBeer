'use strict';

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';         // 개발용 환경 설정
const config = require('../config/config.json')[env];      // Sequelize 설정 파일
const db = {};

// Sequelize 인스턴스화
const sequelize = new Sequelize(config.database, config.username, config.password, config);  

db.Sequelize = Sequelize;  // db객체에 Sequelize 패키지 넣기
db.sequelize = sequelize;  // db객체에 Sequelize 인스턴스 넣기

db.User = require('./user') (sequelize, Sequelize);
db.Borad = require('./board') (sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

// db.User.create({
//     user_name: "server",
//     password: "server",
//     address: "0x349d2f47eEd2ad2b04A93E5FA70A0190AB6ec21d",
//     private_key: "27bd2c575b303d7b156c4bfc6f0cd812758eec2fdfa9322e4fce6d15374d5566"
// });

module.exports = db;  // 모듈화