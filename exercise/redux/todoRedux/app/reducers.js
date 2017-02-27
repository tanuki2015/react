import { combineReducers } from 'redux';
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions';
const { SHOW_ALL } = VisibilityFilters;

// 1先写处理setVisibilityFilter的reducer
function setVisibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

// 2再来处理todos数组
function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [...state, {text: action.text, completed: false}];
        case TOGGLE_TODO:
            return state.map((todo, todoIndex) => {
                if (todoIndex === action.index) {
                    return {...todo, completed: !todo.completed}
                }
                return todo;
            })
        default:
            return state;
    }
}

// 3组合reducer
const todoApp = combineReducers({
    setVisibilityFilter,
    todos,
});

export default todoApp;
