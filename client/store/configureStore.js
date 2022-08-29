import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore} from 'redux'
import reducer from '../reducers'
import {composeWithDevTools} from 'redux-devtools-extension'


const configureStore = () =>{
    const middlewares = [];
    const enhancer = (process.env.NODE_ENV === 'production') ? compose(applyMiddleware(...middlewares)): composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(reducer,enhancer);
    return store;
};


const wrapper = createWrapper(configureStore,{debug:process.env.NODE_ENV === 'development'});
/**
 * 1. wrapper를 만든다
*/
export default wrapper;