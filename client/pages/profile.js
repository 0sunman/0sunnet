import AppLayout from "../component/AppLayout.js"
import Head from "next/head";
import NicknameEditForm from "../component/NicknameEditForm.js"
import FollowList from "../component/FollowList.js";

const Profile = () => {
    const [followingList, followerList] = [[{nickname:"테스트11"},{nickname:"테스트12"},{nickname:"테스트13"}],[{nickname:"테스트21"},{nickname:"테스트22"},{nickname:"테스트23"}]]
    return (<>
        <Head>
            <title>Profile | React</title>
            <meta charSet="utf-8"/>
        </Head>
            <AppLayout>
                <NicknameEditForm/>
                <FollowList header="팔로잉 목록" data={followingList}/>
                <FollowList header="팔로워 목록" data={followerList}/>
            </AppLayout>
        </>)
}
export default Profile;