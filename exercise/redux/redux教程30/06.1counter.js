// import { createStore } from 'redux';

const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners.map(item => item !== listener );
        }
    };

    return {getState, dispatch, subscribe};
};


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

document.addEventListener('click', () => {
    store.dispatch({type: 'INCREMENT'});
});

const render = () => {
    document.body.innerHTML = store.getState();
};

store.subscribe(render);

// 为了设置初始值
store.dispatch({});

export default counter;