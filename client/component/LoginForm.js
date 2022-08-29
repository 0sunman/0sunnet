import { Form, Input, Button } from "antd"
import { useCallback, useState } from "react"
import Link from "next/link"
import useInput from "../hooks/useInput"
import { useDispatch } from "react-redux"
import { loginAction } from "../reducers/user"



const LoginForm = () =>{
    const [
        [id,onChangeId],
        [password,onChangePassword]
    ] = [
        useInput(""),
        useInput("")
    ]

    const dispatch = useDispatch();


    const onSubmitForm = useCallback(()=>{
        console.log(id,password)
        dispatch(loginAction({id,password}));
    },[id,password]);

    return (<>
    <Form onFinish={onSubmitForm} className="p-2">
        <div>
            <label htmlFor="user-id">아이디</label>
            <br/>
            <Input name="user-id" values={id} onChange={onChangeId} required></Input>
        </div>
        <div>
            <label htmlFor="user-password">비밀번호</label>
            <br/>
            <Input name="user-password" values={password} onChange={onChangePassword} required></Input>
            
        </div>
        <div className="mt-2">
            <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
            <Link href="/signup"><a>회원가입</a></Link>
        </div>
        <div>
            
        </div>
    </Form>
    </>)
}

export default LoginForm