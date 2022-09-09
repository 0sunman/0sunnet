import { Avatar, Card, Button } from "antd"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logoutRequestAction } from "../reducers/user"

const UserProfile = () =>{
    const dispatch = useDispatch() 
    const {me, logOutLoading} = useSelector(({user})=>user)
    const onLogout = useCallback(()=>{
        dispatch(logoutRequestAction())
    },[])
    return (<Card
        actions={[
            <div key="twit">쨱쨱<br/>{me.Posts.length}</div>,
            <div key="followings">팔로잉<br/>{me.Followings.length}</div>,
            <div key="follower">팔로워<br/>{me.Followers.length}</div>
        ]}
    >
        <Card.Meta
            title={me.nickname[0]}
            avatar={<Avatar>{me.nickname}</Avatar>}
        ></Card.Meta>
        <Button onClick={onLogout} loading={logOutLoading}>로그아웃</Button>
    </Card>)
}

export default UserProfile