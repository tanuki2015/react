import { createStore, combineReducers} from 'redux';

const todo = (state,action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false,
            };

        case 'TOGGLE_TODO':
            if (action.id !== state.id) {
                return state;
            }

            return  {...state, completed: !state.completed};

        default:
            return state;
    }
};

// 改一下名字，addTodo -> todos
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map((item) => {
                return todo(item, action);
            });
        default:
            return state;
    }
};

// 添加visibilityFilter
const visibilityFilter =  (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

//使用combineReducers完成下面的事情
const todoApp = combineReducers({
    todos,
    visibilityFilter
});

// const todoApp = (state = {}, action) => {
//     return {
//         todos: todos(state.todos, action),
//         visibilityFilter: visibilityFilter(state.filter, action),
//     }
// };


const store = createStore(todoApp);
console.log('initial state');
console.log(store.getState());

store.dispatch({type: 'ADD_TODO', id: 0, text: 'learn redux', completed: false});
console.log(store.getState());
store.dispatch({type: 'ADD_TODO', id: 1, text: 'go to shopping', completed: false});
console.log(store.getState());
console.log('----------------');

store.dispatch({type: 'TOGGLE_TODO', id: 1});
console.log(store.getState());

store.dispatch({type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_COMPLETED'});
console.log(store.getState());

