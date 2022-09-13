const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const db = require("./models");
db.sequelize.sync()
    .then(()=>{
        console.log('DB 연결 성공')
    })
    .catch(console.error)

app.get('/',(req,res)=>{
    res.send("hello express");
})
app.use("/post",postRouter);
app.use("/user",userRouter);
app.listen(3065,()=>{
    console.log("서버 실행중")
})