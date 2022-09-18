const passport = require("passport");
const {Strategy:LocalStrategy} = require("passport-local");
const bcrypt = require('bcrypt');
const { User } = require("../models");

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField:'password'
    }, async (email, password, done) =>{

        try{
            const user = await User.findOne({ // 이메일검사
                where:{email}
            });
            if(!user){
                return done(null, false, {reason:'존재하지 않는 사용자입니다!'})
            }
            const result = await bcrypt.compare(password, user.password); // 비밀번호 검사
            if(result){ // 참
                return done(null, user)
            }
            return done(null,false,{reason:"비밀번호가 틀렸습니다."}); // 거짓
        }catch(err){
            console.error(err);
            done(err);

        }

    }));
}