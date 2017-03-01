import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';

// 1. 写counter
const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state -1;
        default:
            return state;
    }
};

// 2. 构建store
const store = createStore(counter);

// 3. react的counter组件
const Counter = ({
    value,
    onIncrement,
    onDecrement
}) => {
    return (
        <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
        </div>
    )
};

// 4 通过订阅store事件来render，所以先包起来
const render = () => {
    ReactDom.render(
        <Counter
            value={store.getState()}
            onIncrement={() => {store.dispatch({type:'INCREMENT'})}}
            onDecrement={() => {store.dispatch({type:'DECREMENT'})}}
        />,
        document.querySelector('#app'),
    );
};

// 5 订阅state改变的事件
store.subscribe(render);

render();