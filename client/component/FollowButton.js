import {Button} from "antd"
import PropTypes from 'prop-types'
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../reducers/user"

const FollowButton = ({post})=>{
    const dispatch = useDispatch();
    const {me, followLoading, unfollowLoading} = useSelector(({user})=>user)
    const isFollowing = me?.Followings.find((v) => v.email === post.User.email);
    const onClickButton = useCallback(()=>{
        if(isFollowing){
            dispatch({
                type : UNFOLLOW_REQUEST,
                data : post.User.email
            })
        }else{
            dispatch({
                type : FOLLOW_REQUEST,
                data : post.User.email
            })
        }
    })
    return (<Button loading={followLoading || unfollowLoading} onClick={onClickButton}>{(isFollowing)?"언팔로우":"팔로우"}</Button>)
}

FollowButton.propTypes = {
    post : PropTypes.object.isRequired
} 

export default FollowButton;