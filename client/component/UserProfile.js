import { Avatar, Card, Button } from "antd"
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { logoutAction } from "../reducers/user"

const UserProfile = () =>{
    const dispatch = useDispatch() 
    const onLogout = useCallback(()=>{
        dispatch(logoutAction())
    },[])
    return (<Card
        actions={[
            <div key="twit">쨱쨱<br/>0</div>,
            <div key="followings">팔로잉<br/>0</div>,
            <div key="follower">팔로워<br/>0</div>
        ]}
    >
        <Card.Meta
            title="0Sun"
            avatar={<Avatar>TEST</Avatar>}
        ></Card.Meta>
        <Button onClick={onLogout}>로그아웃</Button>
    </Card>)
}

export default UserProfile