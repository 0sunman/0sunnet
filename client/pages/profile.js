import AppLayout from "../component/AppLayout.js"
import Head from "next/head";
import NicknameEditForm from "../component/NicknameEditForm.js"
import Router, { useRouter } from 'next/router'
import FollowList from "../component/FollowList.js";
import {useSelector} from "react-redux"
import { useEffect } from "react";

const Profile = () => {
    const {me} = useSelector(({user})=>(user)?user:null)
    const Router = useRouter();
    useEffect(()=>{
        if(!(me && me.id)){
            Router.push("/");
        }
    },[me && me.id])
    if(me === null){
        return null;
    }
    return (<>
        <Head>
            <title>Profile | React</title>
            <meta charSet="utf-8"/>
        </Head>
            <AppLayout>
                <NicknameEditForm/>
                <FollowList header="팔로잉" data={me.Followings}/>
                <FollowList header="팔로워" data={me.Followers}/>
            </AppLayout>
        </>)
}
export default Profile;