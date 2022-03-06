require('dotenv').config();

const development = {
  username: "root",
  password: process.env.DATABASE_PASSWORD,
  database: "Mangobeer",
  host: "127.0.0.1",
  dialect: "mysql",
  port: 3306,
  timezone: "+09:00",
  logging: false,
  dialectOptions: {  // 디비에서 시간 가져올때 string으로 가져와 디비 그대로 출력해준다.
    dateStrings: true,   // string 으로 안하면 디비엔 한국시간이지만 출력은 영국시간으로 출력된다.
    typeCast: true
  }
}

const test = {
  username: "root",
  password: null,
  database: "database_test",
  host: "127.0.0.1",
  dialect: "mysql"
}

const production = {
  username: "root",
  password: null,
  database: "database_production",
  host: "127.0.0.1",
  dialect: "mysql"
}
  
  module.exports = { development, production, test };