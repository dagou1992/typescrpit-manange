import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import watchGetPosts from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, logger];
const store = createStore(reducer, applyMiddleware(...middleware));

sagaMiddleware.run(watchGetPosts);

export default store;