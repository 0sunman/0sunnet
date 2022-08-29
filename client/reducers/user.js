import {HYDRATE} from 'next-redux-wrapper'

export const initialState = {
    isLoggedIn : false,
    user:null,
    signUpData:{},
    loginData:{}
}


export const loginAction = (data)=>({ // 동기 액션 생성기
    type:"LOG_IN",
    data
})

export const logoutAction = ()=>({
    type:"LOG_OUT"
})

// action => rootReducer (이전, 다음)
// => 데이터와 액션을 넘겨주면, 데이터가 변함
const reducer = (state=initialState,action) =>{
    switch(action.type){
        case "LOG_IN":
        return {
            ...state,
            isLoggedIn:true,
            user:action.data
        }
        case "LOG_OUT":
            return{
                ...state,
                isLoggedIn:false
            }
        default:
            return state
    }
}

export default reducer;