import {applyMiddleware, combineReducers, createStore} from 'redux';

import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const rootReducer = combineReducers({main: reducer});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

sagaMiddleware.run(saga);

export default store;
