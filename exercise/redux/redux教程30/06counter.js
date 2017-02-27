import { createStore } from 'redux';

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

const store = createStore(counter);
// console.log(store.getState());

// store.dispatch({ type: 'INCREMENT' });
// console.log(store.getState());  // 1

// 没有显示初始值0，解决方法是手动运行一次显示的代码。
// store.subscribe(() => {
//     document.body.innerHTML = store.getState();
// });
//

document.addEventListener('click', () => {
    store.dispatch({type: 'INCREMENT'});
});

const render = () => {
    document.body.innerHTML = store.getState();
};

store.subscribe(render);
render();

export default counter;