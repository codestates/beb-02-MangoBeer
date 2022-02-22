import express from "express";

const app = express();
const port = 3000;

// 포트로 서버 오픈
app.listen(port, () => {
    console.log(`port : ${port} 구동중!`);
});