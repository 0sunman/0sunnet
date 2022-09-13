const express = require("express");
const {User } = require("../models");
const bcrypt = require('bcrypt');

const router = express.Router();


router.post('/',async (req,res)=>{
    try{
        const exUser = await User.findOne({
            where:{
                email:req.body.email, 
            }
        })
        if(exUser){
            return res.status(403).send("이미 사용중인 이메일입니다.")
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 9);

        await User.create({
            email:req.body.nickname,
            nickname:req.body.nickname,
            password:hashedPassword
        })
        res.send("ok");
    }catch(error){
        console.log(error);
        next(error);
    }
})

module.exports = router; 