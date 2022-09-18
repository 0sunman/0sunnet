const express = require("express");
const {User, Post } = require("../models");
const bcrypt = require('bcrypt');
const passport = require("passport");

const router = express.Router();

router.post("/login", (req,res,next)=> {
    //1. local 전략으로 실행됨. (자료를 어떻게 주고 받는지 / 실질적인 비즈니스 로직임)
    //2. local 전략 흐름에 따라서 serialize / deserialize. (데이터 압축 관점)
    //3. 전략 실행후 이곳에서 최종 확인 (서버 관점)
    passport.authenticate('local', (err, user, info) =>{
            if(err){
                console.error(err);
                next(err);
            }
            if(info){
                return res.status(401).send(info.reason);
            }
            return req.login(user, async(loginErr)=>{
                if(loginErr){
                    console.error(loginError);
                    return next(loginErr);
                }

                const userWithoutPassword = await User.findOne(
                    {
                        "where" : {id:user.id},
                        "attributes" : {
                            "exclude":['password']                    
                        },
                        "include" : [
                            {model:Post},
                            {model:User,as:'Followings'},
                            {model:User,as:'Followers'}
                        ]
                    }
                )
                
                return res.json(userWithoutPassword);
            })
        })(req,res,next)
    }); /*
    local => passport.use(
                        new LocalStrategy([변수정의], 
                        (변수...,done)=>{ 
                            // TODO... 
                        })
                    );

*/// 
router.post('/signup',async (req,res)=>{
    try{
        const exUser = await User.findOne({
            where:{
                email:req.body.email, 
            }
        })
        if(exUser){
            return res.status(403).send("이미 사용중인 이메일입니다.")
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 2);

        await User.create({
            email:req.body.email,
            nickname:req.body.nickname,
            password:hashedPassword
        })
        res.setHeader("Access-Control-Allow-Origin","*")
        res.send("ok");
    }catch(error){
        console.log(error);
        next(error);
    }
})

router.post('/logout',(req,res)=>{
    req.logOut();
    req.session.destroy();
    res.send("ok");
})

module.exports = router; 