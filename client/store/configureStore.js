import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore} from 'redux'
import reducer from '../reducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'


const configureStore = () =>{
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = (process.env.NODE_ENV === 'production') ? compose(applyMiddleware(...middlewares)): composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(reducer,enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};


const wrapper = createWrapper(configureStore,{debug:process.env.NODE_ENV === 'development'});
/**
 * 1. wrapper를 만든다
*/
export default wrapper;