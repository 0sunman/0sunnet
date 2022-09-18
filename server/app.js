const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require('passport');
const passportConfig = require('./passport');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

passportConfig();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser(process.env.COOKIE_SECRET)); // 일치해야함

app.use(session({
    saveUninitialized:false,
    resave:false,
    secret:process.env.COOKIE_SECRET // 일치해야함
}));
app.use(passport.initialize());
app.use(passport.session());


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