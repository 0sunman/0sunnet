import {  RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone} from '@ant-design/icons';
import { Card,Avatar, Button, Popover, List, Comment } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {REMOVE_POST_REQUEST } from '../reducers/post'
import PropsTypes from "prop-types"
import PostImages from "../component/postImages"
import CommentForm from "../component/commentForm"
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';

import { useCallback, useState } from 'react';
const PostCard = ({post}) => {
    const dispatch = useDispatch();
    const email = useSelector(({user})=>user.me?.email)

    const removePostLoading = useSelector(({post})=>post.removePostLoading)

    const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const onToggleLike = useCallback((e) =>{
        setLiked((prev)=>!prev)
    },[])
    const onToggleComment = useCallback((e)=>{
        setCommentFormOpened((prev)=>!prev)
    },[])
    const onRemovePost = useCallback(()=>{
        dispatch({
            type:REMOVE_POST_REQUEST,
            data:post.id
        })
    },[])
    return (<div className='mt-2.5 mb-5'>

        <Card cover={post.Images[0] && <PostImages images={post.Images}/>}
               actions={[
                <RetweetOutlined key="retweet"/>,
                liked ? 
                    (<HeartTwoTone twoToneColor="#ff0000" key="heart" onClick={onToggleLike}/>):
                    (<HeartOutlined key="heart" onClick={onToggleLike}/>)
                ,
                <MessageOutlined key="comment" onClick={onToggleComment}/>,
                <Popover key="more" content={(
                    <Button.Group>
                        {(email && post.User.email === email)?
                        <>
                            <Button>수정</Button>
                            <Button loading={removePostLoading} onClick={() => onRemovePost()}>삭제</Button>
                        </>:
                        <Button type="danger">신고</Button>}
                        
                        
                    </Button.Group>
                )}>
                    <EllipsisOutlined/>
                </Popover>
               ]}

               extra={ email && <FollowButton post={post}></FollowButton>}
            >
                <Card.Meta 
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content}/>}
                    />
            {/* <Image/>
            <Content/>
            <Buttons></Buttons> */}
        </Card>
        {commentFormOpened && (<div>
            <CommentForm post={post}/>
            <List
                header={`${post.Comments.length}개의 댓글`}
                itemLayout="horizontal"
                dataSource={post.Comments} 
                renderItem={(item)=>(
                    <li>
                        <Comment 
                            author={item.User.nickname}
                            avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                            content={item.content}
                        ></Comment>
                    </li>
                )}
                />
        </div>)}
        {/* 
        <Comments/> */}
    </div>)
}

PostCard.propTypes = {
    post:PropsTypes.shape({
        id:PropsTypes.number,
        User:PropsTypes.object,
        content:PropsTypes.string,
        createdAt:PropsTypes.object,
        Comments:PropsTypes.arrayOf(PropsTypes.object)
    }).isRequired
}
export default PostCard