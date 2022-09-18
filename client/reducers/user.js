import {HYDRATE} from 'next-redux-wrapper'
import produce from 'immer';

export const initialState = {
    logInLoading:false,
    logInDone:false,
    logInError:null,
    
    logOutLoading:false,
    logOutDone:false,
    logOutError:null,

    signUpLoading:false,
    signUpDone:false,
    signUpError:null,    

    followLoading:false,
    followDone:false,
    followError:null,    
    
    unfollowLoading:false,
    unfollowDone:false,
    unfollowError:null,    

    changeNickNameLoading:false,
    changeNickNameDone:false,
    changeNickNameError:null,    

    me:null,
    signUpData:{},
    loginData:{}
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_TO_ME = 'REMOVE_POST_TO_ME';


export const loginRequestAction = (data)=>({ // 동기 액션 생성기
    type:LOG_IN_REQUEST,
    data
})


export const logoutRequestAction = ()=>({ // 동기 액션 생성기
    type:LOG_OUT_REQUEST
})

export const addPostOfMe = (data) => ({
    type:ADD_POST_TO_ME,
    data
})

export const removePostOfMe = (data) => ({
    type:REMOVE_POST_TO_ME,
    data
})


const dummyUser = (data) => ({...data, nickname:'0sun', 
    id:1,
    Posts:[],
    Followings:[{email:"테스트1"},{email:"테스트2"},{email:"테스트3"}],
    Followers:[{email:"테스트1"},{email:"테스트2"},{email:"테스트3"}]
})

// => 데이터와 액션을 넘겨주면, 데이터가 변함
// action => rootReducer (이전, 다음)
const reducer = (state=initialState,action) =>{
    return produce(state,draft=>{
        switch(action.type){
            case LOG_IN_REQUEST:
                draft.logInLoading=true;
                draft.logInError=null;
                draft.logInDone=false;
            break;

            case LOG_IN_SUCCESS:
                draft.logInLoading=false;
                draft.logInDone=true;
                draft.logInError=null;
                draft.me=dummyUser(action.data);
            break;
            
            case LOG_IN_FAILURE:
                draft.logInLoading = false;
                draft.logInError = action.error;
            break;
    
            case LOG_OUT_REQUEST:
                draft.logOutLoading = true;
                draft.logOutDone = false;
                draft.logOutError = null;
            break;

            case LOG_OUT_SUCCESS:
                draft.logOutLoading = false,
                draft.logOutDone = true,
                draft.logOutError = null,
                draft.me = null
            break;

            case LOG_OUT_FAILURE:
                draft.logOutLoading = false;
                draft.logOutError = action.error;
            break;
    
    
            case SIGN_UP_REQUEST:
                draft.signUpLoading=true;
                draft.signUpDone=false;
                draft.signUpError=null;
            break;

            case SIGN_UP_SUCCESS:
                draft.signUpLoading=false;
                draft.signUpDone=true;
                draft.signUpError=null;
                draft.me=null
            break;

            case SIGN_UP_FAILURE:
                draft.signUpLoading=false;
                draft.signUpError=action.data;
            break;
    
    
            case CHANGE_NICKNAME_REQUEST:
                draft.changeNickNameLoading=true;
                draft.changeNickNameDone=false;
                draft.changeNickNameError=null;
            break;

            case CHANGE_NICKNAME_SUCCESS:
                draft.changeNickNameLoading=false;
                draft.changeNickNameDone=true;
                draft.changeNickNameError=null;
                draft.me=null
            break;
            
            case CHANGE_NICKNAME_FAILURE:
                draft.changeNickNameLoading=false;
                draft.changeNickNameError=action.error;
            break;
    
            case REMOVE_POST_TO_ME:
                const targetIdx = draft.me.Posts.findIndex(v=>v === action.data);
                draft.me.Posts.splice(targetIdx,1);

            break;
            
            case ADD_POST_TO_ME:
                draft.me.Posts = [...(draft.me.Posts), action.data]
            break;
    





            case FOLLOW_REQUEST:
                draft.followLoading=true;
                draft.followDone=false;
                draft.followError=null;
            break;

            case FOLLOW_SUCCESS:
                draft.followLoading=false;
                draft.followDone=true;
                draft.me.Followings.push({email:action.data})
                draft.followError=null;
            break;

            case FOLLOW_FAILURE:
                draft.followLoading=false;
                draft.followError=action.error;
            break;
    


            case UNFOLLOW_REQUEST:
                draft.unfollowLoading=true;
                draft.unfollowDone=false;
                draft.unfollowError=null;
            break;

            case UNFOLLOW_SUCCESS:
                draft.unfollowLoading=false;
                draft.unfollowDone=true;
                draft.unfollowError=null;
                draft.me.Followings = draft.me.Followings.filter((v)=> v.email !== action.data)
            break;

            case UNFOLLOW_FAILURE:
                draft.unfollowLoading=false;
                draft.unfollowError=action.error;
            break;
    



            default:
            break;
        }
    })

}

export default reducer;