import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import createSagaMiddleware from 'redux-saga';
import reduxLogger from 'redux-logger';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import { applyMiddleware, compose, createStore } from 'redux';
import { reducer } from './reducers';
import { sagaWatcher } from './sagas';

const saga = createSagaMiddleware();
const store = createStore(reducer, compose(applyMiddleware(reduxLogger, saga)));
saga.run(sagaWatcher);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'));
