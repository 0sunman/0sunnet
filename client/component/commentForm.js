import { Button, Form, Input } from "antd";
import { useEffect, useCallback } from "react";
import useInput from "../hooks/useInput";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../reducers/post";
const CommentForm = ({post}) =>{
    const dispatch = useDispatch()
    const {email,id} = useSelector((({user})=>user.me))
    const {addCommentDone} = useSelector((({post})=>post))
    const [commentText, onChangeCommentText, setCommentText] = useInput('');


    useEffect(()=>{
        if(addCommentDone){
            setCommentText('');
        }
    },[addCommentDone])


    const onSubmitComment = useCallback(()=>{
        dispatch({
            type:ADD_COMMENT_REQUEST,
            data:{content:commentText, postId:post.id, email, id}
        })

    },[commentText, id])
return(<Form onFinish={onSubmitComment}>
    <Form.Item>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4}/>
        <Button type="primary" htmlType="submit">삐약</Button>
    </Form.Item>
    폼
</Form>)   
}

CommentForm.propTypes = {
    post:PropTypes.object.isRequired
}

export default CommentForm;