import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

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


// 4.通过mapStateToProps映射state到组件（规定写法）
const mapStateToProps = (state) => {
    // 返回一个对象，这个对象会作为组件的属性
    return {
        value: state,
    }
};

// 5.通过mapDispatchToProps 映射方法到组件（规定写法）
const mapDispatchToProps = (dispatch) => {
    return {
        onIncrement: () => dispatch({type: 'INCREMENT'}),
        onDecrement: () => dispatch({type: 'DECREMENT'})
    }
};

// 6. 通过connect连接,规定写法
let App = connect(mapStateToProps, mapDispatchToProps)(Counter);

// 7. render，render Provider,然后包住App
ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#app'),
);


// 下面不需要了
// const render = () => {
//     ReactDom.render(
//         <Counter
//             value={store.getState()}
//             onIncrement={() => {store.dispatch({type:'INCREMENT'})}}
//             onDecrement={() => {store.dispatch({type:'DECREMENT'})}}
//         />,
//         document.querySelector('#app'),
//     );
// };
//
//
// store.subscribe(render);
//
