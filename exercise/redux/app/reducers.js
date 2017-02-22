import { combineReducers } from 'redux';
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions';
const { SHOW_ALL } = VisibilityFilters;

// 1. 拆分todos
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, {text: action.text, completed: false}];

    case TOGGLE_TODO:
    // 通过对象扩展返回新对象，需要stage3的支持
      return [
        state.map((todo, index) => {
          if (action.index === index) {
            return {...todo, completed: !todo.completed};
          }
          return todo;
        })
      ]

    default:
    return state;
  }
}

// 2. 拆分 SET_VISIBILITY_FILTER
function setVisibilityFilter (state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
    return state;
  }
}

// 通过redux提供的combineReducers函数来组合reducers
const todoApp = combineReducers({
  todos,
  setVisibilityFilter,
});

export default todoApp;
