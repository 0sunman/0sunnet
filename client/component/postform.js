import { useCallback, useState, useRef, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';
import useInput from '../hooks/useInput';
const PostForm = () => {
    const dispatch = useDispatch();
    const imageInput = useRef();
    const {imagePaths,addPostDone,id:PostId} = useSelector(({post})=>post)
    const {me} = useSelector(({user})=>user)
    const [textData, onChangeText, setTextData] = useInput('');

    useEffect(()=>{
        if(addPostDone){
            setTextData('');
        }
    },[addPostDone])

    useEffect(()=>{
        console.log(textData);
    },[textData])

    const onSubmit = useCallback(()=>{
        console.log(textData)
//        dispatch(addPost({name:me.id,message:textData}))
        dispatch(addPost({email:me.email, content:textData}))
        setTextData("")
    },[textData]);
    const onImageUpload = useCallback(()=>{
        imageInput.current.click();
    },[imageInput.current])
    return (<Form className="mx-0 mt-2.5 mb-5" encType="multipart/form-data" onFinish={onSubmit}>
        <Input.TextArea value={textData} onChange={onChangeText} maxLength={140} placeholder="어떤 신기한 일이 있었나요?"></Input.TextArea>
        <div>
            <input type="file" multiple hidden ref={imageInput}/>
            <Button onClick={onImageUpload}>이미지 업로드</Button>
            <Button type="primary" className='float-right' htmlType='submit'>쨱쨱</Button>
        </div>
        <div>
            {imagePaths.map((v)=>(
                <div key={v} className='inline-block'>
                    <img src={v} className='w-52' alt={v}/>
                    <div>
                        <Button>제거</Button>
                    </div>
                </div>
            ))}
        </div>
    </Form>)
}

export default PostForm