// 开始写reducer
// reducer 是纯函数 (prevState, action) => newState

import VisibilityFilters from './action.js'

// 第一次运行时返回这个初始化的state

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: [],
}

// 返回默认值或处理后的state
// function reducer(state = initialState, action) {
//   return state;
// }

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return {...state, visibilityFilter: action.filter};
    case ADD_TODO:
      return { ...state, todos: [...state.todo, {text: action.text, completed: false}] };
    case TOGGLE_TODO:
    // 通过对象扩展返回新对象，需要stage3的支持
      return {
        ...state,
        todos: state.todos.map((todo, index) => {
          if (action.index === index) {
            return {...todo, completed: !todo.completed,}
          }
          return todo;
        })
      }

    default:
    return state;
  }
  return state;
}

// 这个reducer已经写完，下一步是拆分reducer。为什么要拆分？
// 可以想象，一旦case的项目多了，这个reducer就太大了，所以需要根据不同的操作拆开
// 比如这个就可以拆分成对todos数组的处理和改变显示状态的这两块，让不同的reducer管理各自的state

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

// 3 用一个主reducer合成上面两个子reducer
function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action);
    setVisibilityFilter: setVisibilityFilter(state.setVisibilityFilter, action);
  }
}
