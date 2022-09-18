import {all, fork, call, takeLatest, put, throttle, delay} from 'redux-saga/effects'
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3065/"
import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, 
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
    UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
} from '../reducers/user';
import { Result } from 'antd';

function loginAPI(data){
    return axios.post('/user/login',data);
}
function logoutAPI(){
    return axios.post('/user/logout');
}
function signupAPI(data){
    return axios.post('/user/signup',data);
}
function followAPI(){
    return axios.post('/user/follow');
}
function unfollowAPI(){
    return axios.post('/user/unfollow');
}
function* login(action){
    try{
        const result = yield call(loginAPI, action.data);
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data
        })
    }catch(err){
        yield put({
            type: LOG_IN_FAILURE,
            data: err
        })
    }

}

function* logout(){
    try{
        call(logoutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
         //   data: result.data
        })
    }catch(err){
        yield put({
            type: LOG_OUT_FAILURE,
            data: err.response.data
        })
    }

}

function* signup(action){
    try{
        const result = yield call(signupAPI, action.data);
        yield put({
            type:SIGN_UP_SUCCESS,
//            data:result.data
        })
    }catch(err){
        yield put({
            type:SIGN_UP_FAILURE,
            data:err.response.data
        })
    }
}


function* follow(action){
    try{
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data
        })
    }catch(err){
        yield put({
            type: FOLLOW_FAILURE,
            data: err
        })
    }

}


function* unfollow(action){
    try{
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data
        })
    }catch(err){
        yield put({
            type: UNFOLLOW_FAILURE,
            data: err
        })
    }

}


// 이펙트 연결
function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST,login)
}

function* watchLogOut(){
    yield takeLatest(LOG_OUT_REQUEST,logout)
}

function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST,signup);
}


function* watchFollow(){
    yield takeLatest(FOLLOW_REQUEST,follow);
}


function* watchUnfollow(){
    yield takeLatest(UNFOLLOW_REQUEST,unfollow);
}


export default function* userSaga(){
    // 이펙트를 만드는 함수
    yield all([
        call(watchLogin),
        call(watchLogOut),
        call(watchSignUp),
        call(watchFollow),
        call(watchUnfollow),
    ])
}
