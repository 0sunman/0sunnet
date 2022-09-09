import {all, fork, call, takeLatest, put, throttle} from 'redux-saga/effects'
import axios from 'axios';
import userSaga from "./user"
import postSaga from "./post"

export default function* rootSaga(){
    // 이펙트를 만드는 함수
    yield all([
        fork(userSaga),
        fork(postSaga),
    ])
}

// root* -> watch* -> action* <- axios