import shortid from 'shortid'; 
import {HYDRATE} from 'next-redux-wrapper'
import produce from 'immer';
import { faker } from '@faker-js/faker';

export const initialState = {
    mainPosts:[],
    imagePaths:[],
    hasMorePost:true,
    addPostLoading:false,
    addPostDone:false,
    addPostError:null,
    addCommentLoading:false,
    addCommentDone:false,
    addCommentError:null,
    removePostLoading:false,
    removePostDone:false,
    removePostError:null,
    loadPostsLoading:false,
    loadPostsDone:false,
    loadPostsError:null,
}
export const generateDummyPost = (number) => Array(number).fill().map((v,i)=>({
    id:shortid.generate(),
    User:{
        email:faker.name.findName(),
        nickname:faker.name.findName()
    },
    content:faker.lorem.paragraph(),
    Images:[{
        src:faker.image.imageUrl(),
    }],
    Comments:[{
        User:{
            email:faker.internet.email(),
            nickname:faker.name.findName()
        },
        content:faker.lorem.sentence()
    }],
}))


export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";


/*

    data:{
        User:{nickname:name},
        content:message,
        Images:[{
            src:"http://placeimg.com/640/480/1"
        },{
            src:"http://placeimg.com/640/480/2"
        },{
            src:"http://placeimg.com/640/480/3"
        }],
        Comments:[{
            User:{nickname:'nero'},
            content:"우와 개정판이 나왔군요~"
        },{
            User:{nickname:'haha'},
            content:"우와~ 굳~"
        }]
    }

*/

export const dummyPost = (id,email,data) => ({
    id, content:data,
    User:{
        email,
        nickname:'0sun'
    }, 
    Images:[], Comments:[]
})

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data
})
export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data
})
export const removePost = (data) => ({
    type: REMOVE_POST_REQUEST,
    data
})

const reducer = (state=initialState,action) =>{
    return produce(state,(draft)=>{
        console.log(state.hasMorePost);
        switch (action.type){
            case LOAD_POSTS_REQUEST:
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;

            case LOAD_POSTS_SUCCESS:
                draft.mainPosts = action.data.concat(draft.mainPosts);
                draft.loadPostsLoading = false;
                draft.loadPostsDone = true;
                draft.loadPostsError = null
                draft.hasMorePost = draft.mainPosts.length < 30;

                break;

            case LOAD_POSTS_FAILURE:
                draft.loadPostsLoading = false,
                draft.loadPostsDone = false,
                draft.loadPostsError = action.error
                break;

            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;

            case ADD_POST_SUCCESS:
                const {id,content,email} = action.data
                draft.email = email;
                draft.mainPosts.unshift(dummyPost(id, email, content));
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.addPostError = null
                break;

            case ADD_POST_FAILURE:
                draft.addPostLoading = false,
                draft.addPostDone = false,
                draft.addPostError = action.error
                break;

            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;

            case ADD_COMMENT_SUCCESS:
                draft.mainPosts = draft.mainPosts.map((v)=>{
                    if(v.id == action.data.postId){
                        v.Comments.push({
                            User : {nickname:action.data.email},
                            content :  action.data.content
                        })
                    }
                    return v;
                })
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                draft.addCommentError = null;
                break;
    
            case REMOVE_POST_REQUEST:
                draft.removePostLoading= true;
                draft.removePostDone= false;
                draft.removePostError= null;
            break;

            case REMOVE_POST_SUCCESS:               
                draft.mainPosts=draft.mainPosts.filter((v)=>v.id !== action.data),
                draft.removePostLoading=false,
                draft.removePostDone=true,
                draft.removePostError=null
            break;


            case REMOVE_POST_FAILURE:
                draft.removePostLoading=false,
                draft.removePostDone=false,
                draft.removePostError=action.error
            break;

            default:
            break;
        }
    })

}

export default reducer;