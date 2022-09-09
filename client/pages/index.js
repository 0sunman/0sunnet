import AppLayout from "../component/AppLayout.js"
import Head from "next/head";
import PostForm from "../component/postform";
import PostCard from "../component/postcard";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { LOAD_POSTS_REQUEST } from "../reducers/post.js";


const Home = () => {
    
    const {me} = useSelector(({user}) => user)
    const {mainPosts, hasMorePost,loadPostsLoading} = useSelector(({post})=>post)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({
            type:LOAD_POSTS_REQUEST
        })
    },[]);

    useEffect(()=>{
        console.log("한번만이지?");

        function onScroll(){
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500){
                console.log("헤즈모어포스트?",hasMorePost)
                if(hasMorePost && !loadPostsLoading){
                    dispatch({
                        type:LOAD_POSTS_REQUEST
                    })
                }
            }
        }
        window.addEventListener('scroll',onScroll);
        return ()=>{
            window.removeEventListener('scroll',onScroll);
        }
    },[hasMorePost,loadPostsLoading]);


    return (<>
    <Head>
        <title>Main | React</title>
        <meta charSet="utf-8"/>
    </Head>
        <AppLayout>
            { me && <PostForm/>}
            { mainPosts.map((post) => <PostCard key={post.id} post={post}/>)}
        </AppLayout>
    </>)
}
export default Home;