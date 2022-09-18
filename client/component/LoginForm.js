import { Form, Input, Button } from "antd"
import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import useInput from "../hooks/useInput"
import { useDispatch } from "react-redux"
import { loginRequestAction } from "../reducers/user"
import { useSelector } from "react-redux"



const LoginForm = () =>{
    const [
        [email,onChangeEmail],
        [password,onChangePassword]
    ] = [
        useInput(""),
        useInput("")
    ]

    const dispatch = useDispatch();
    const {logInLoading, logInError} = useSelector(({user})=>user)

    useEffect(()=>{
        console.log(logInError)
        if(logInError){
            alert(logInError.response.data);
        }
    },[logInError])

    const onSubmitForm = useCallback(()=>{
        console.log(email,password)
        dispatch(loginRequestAction({email,password}));
    },[email,password]);

    return (<>
    <Form onFinish={onSubmitForm} className="p-2">
        <div>
            <label htmlFor="user-email">이메일</label>
            <br/>
            <Input name="user-email" values={email} onChange={onChangeEmail} required></Input>
        </div>
        <div>
            <label htmlFor="user-password">비밀번호</label>
            <br/>
            <Input name="user-password" values={password} onChange={onChangePassword} required></Input>
            
        </div>
        <div className="mt-2">
            <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
            <Link href="/signup"><a>회원가입</a></Link>
        </div>
        <div>
            
        </div>
    </Form>
    </>)
}

export default LoginForm