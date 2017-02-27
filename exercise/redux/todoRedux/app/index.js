// 用这个index把react的组件和redux连接起来

import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import App from './App';
import todoApp from './reducers';

// 创建store
let store = createStore(todoApp);

// 连接react和redux
// 第一步 利用provider把state提供给react组件
const rootElement = document.getElementById('app');

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement,
)