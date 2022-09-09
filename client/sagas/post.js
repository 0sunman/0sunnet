import {all, fork, call, takeLatest, put, throttle, delay} from 'redux-saga/effects'
import axios from 'axios';
import {ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, ADD_POST_SUCCESS,ADD_POST_REQUEST, ADD_POST_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_FAILURE, REMOVE_POST_SUCCESS, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, generateDummyPost } from '../reducers/post'
import { ADD_POST_TO_ME, REMOVE_POST_TO_ME } from '../reducers/user';
import shortid from 'shortid';

function loadPostAPI(){
    return axios.get('/api/post');
}
 

function addPostAPI(){
    return axios.post('/api/addpost');
}
 
function addCommentAPI(){
    return axios.post(`/api/post/${id}/addcomment`);
}
 
function* addPost(action){
    try{
        const id = shortid.generate();
//        const result = yield call(addPostAPI,action.data);
        yield delay(1000);
        yield put({
            type: ADD_POST_SUCCESS,
            data: {id, email:action.data.email, content:action.data.content}
        })
        yield put({
            type: ADD_POST_TO_ME,
            data: id
        })
    }catch(err){
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data
        })
    }

}
 
function* loadPost(){
    try{
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data:generateDummyPost(10),
        })
    }catch(err){
        yield put({
            type: LOAD_POSTS_FAILURE,
        })

    }

}


function* addComment(action){
    try{
//        const result = yield call(addCommentAPI,action.data);
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data
        })
    }catch(err){
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data
        })
    }

}

function* removePost(action){
    try{
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data
        })
        yield put({
            type: REMOVE_POST_TO_ME,
            data: action.data
        })
    }catch(err){
        yield put({
            type: REMOVE_POST_FAILURE,
            data: err.response.data
        })
    }
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST,addPost)
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST,addComment)
}
function* watchRemovePost(){
    yield takeLatest(REMOVE_POST_REQUEST,removePost)
}
function* watchLoadPosts(){
    yield throttle(2000, LOAD_POSTS_REQUEST,loadPost)
}

export default function* rootSaga(){
    // 이펙트를 만드는 함수
    yield all([
        call(watchAddPost),
        call(watchLoadPosts),
        call(watchAddComment),
        call(watchRemovePost),
    ])
}