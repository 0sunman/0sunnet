import AppLayout from "../component/AppLayout.js"
import Head from "next/head";
import {Button, Checkbox, Form, Input} from "antd";
import { useCallback, useEffect, useState } from "react";
import useInput from "../hooks/useInput.js";
/**
 * 
 * Hook 조건 : 컴포넌트 안에서 만들것
 * 컴포넌트 : 화면 그리는 것에만 초점을 둠.
 * {...a} 의미
 * const next = {b:'c'}; const prev = {a:next};
 * const next = {...prev} 일때
 * 
 * next.a === prev.a // true (복사가 아닌 참조!!)
 * next === prev // false
 * => 이 원리를 통해 메모리를 절약함 
 * **/
const Signup = ({setLoggedIn}) => {
    const [
        [id,onChangeId],
        [nickname,onChangeNickname],
        [password,onChangePassword],
        [passwordCheck,setPasswordCheck],
        [passwordError,setPasswordError],
        [term,setTerm],
        [termError,setTermError]
    ] = [
        useInput(""),
        useInput(""),
        useInput(""),
        useState(""),
        useState(false),
        useState(false),
        useState(false),
    ]
    const data = {id,nickname,password}
    const onSubmitForm = useCallback(()=>{
        if(password !== passwordCheck){ 
            setPasswordError(true);
            return;
        }
        if(!term){
            setTermError(true)
            return;
        }
        console.log( data)

    },[password,passwordCheck,term])

    useEffect(()=>{
        console.log(id,password);
    },[id,password])
    const onChangePasswordCheck = useCallback((e)=>{
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    },[password])
    const onChangeTerm = useCallback((e)=>{
        setTerm(e.target.checked);
        setTermError(false)
    },[])

    return (<>
        <Head>
            <title>Signup | React</title>
            <meta charSet="utf-8"/>
        </Head>
            <AppLayout>
                <Form onFinish={onSubmitForm}>
                    <div>
                        <label htmlFor="user-id">ID</label>
                        <Input id="user-id" value={id} onChange={onChangeId} required></Input>
                    </div>
                    <div>
                        <label htmlFor="user-nickname">Nickname</label>
                        <Input id="user-nickname" value={nickname} onChange={onChangeNickname} required></Input>
                    </div>
                    <div>
                        <label htmlFor="user-password">Password</label>
                        <Input id="user-password" value={password} onChange={onChangePassword} required></Input>
                    </div>
                    <div>
                        <label htmlFor="user-passwordCheck">PasswordCheck</label>
                        <Input id="user-passwordCheck" value={passwordCheck} onChange={onChangePasswordCheck} required></Input>
                        {passwordError && <p className="text-xs text-red-500">비밀번호가 일치하지 않습니다.</p>}
                    </div>
                    <div>
                        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>0sun 말을 잘 들을 것을 동의합니다.</Checkbox>
                        {termError && <p className="text-xs text-red-500">약관에 동의하셔야 합니다.</p>}
                    </div>
                    <div className="mt-5">
                        <Button type="primary" htmlType="submit">가입하기</Button>
                    </div>
                </Form>
            </AppLayout>
        </>)
}
export default Signup;