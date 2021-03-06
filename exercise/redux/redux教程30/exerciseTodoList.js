// 做练习
import React from 'react';
import ReactDom from 'react-dom';
import { createStore, combineReducers } from 'redux';
import expect from 'expect';
import deepFreeze from 'deep-freeze';

// reducer，被todos reducer调用，处理todos中的todo项目，typeof {}
const todo = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

// reducer，处理state中todos，typeof array
const todos = (state = [], action) => {
    switch  (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(item => todo(item, action));
        default:
            return state;
    }
};

// reducer，处理state中visibilityFilter，typeof string
const setVisibilityFilter = (state = 'SHOW_ALL', action) => {
    switch  (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

// combineReducers
const rootReducer = combineReducers({
    todos,
    setVisibilityFilter,
});

// 为了展示符合filter link的项目，先做一个数组过滤，把满足条件的直接传递给todoApp

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ACTIVE':
            return todos.filter(item => !item.completed);
        case 'SHOW_COMPLETED':
            return todos.filter(item => item.completed);
        default :
            return todos;
    }
};
// create todoApp component
let todoId = 0;
class TodoApp extends React.Component {
    render() {
        // 这里解构赋值的名字写错了，搞了一个多小时...
        const {todos, setVisibilityFilter} = this.props;
        const visibleTodos = getVisibleTodos(todos, setVisibilityFilter);
        return (
            <div>
                <input type="text" ref={(node) => {this.input = node}} />
                <button onClick={()=>{
                    store.dispatch({type: 'ADD_TODO', id: todoId++, text: this.input.value});
                    this.input.value = '';
                }}>ADD</button>
                <ul>
                    { visibleTodos.map(todo =>
                        <li
                            key={todo.id}
                            onClick={() => {
                                store.dispatch({type: 'TOGGLE_TODO', id: todo.id});
                            }}
                            style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
                        >
                            {todo.text}
                        </li>) }
                </ul>
                <p>
                    SHOW:
                    {' '}
                    <FilterLink
                        filter="SHOW_ALL"
                        currentFilter={setVisibilityFilter}
                    >
                        ALL
                    </FilterLink>
                    {' '}
                    <FilterLink
                        filter="SHOW_ACTIVE"
                        currentFilter={setVisibilityFilter}
                    >
                        ACTIVE
                    </FilterLink>
                    {' '}
                    <FilterLink
                        filter="SHOW_COMPLETED"
                        currentFilter={setVisibilityFilter}
                    >
                        COMPLETED
                    </FilterLink>

                </p>
            </div>
        )
    }
}

// create filterLink component, todoApp会用到
const FilterLink = ({filter, children, currentFilter}) => {
    if (currentFilter === filter) {
        return <span>{children}</span>
    }
    return (
        <a href="#"
            onClick={(e)=>{
                e.preventDefault();
                store.dispatch({type: 'SET_VISIBILITY_FILTER', filter});
            }}
        >
            {children}
        </a>
    )
};

// create store
const store = createStore(rootReducer);

const render = () => {
    ReactDom.render(
        <TodoApp {...store.getState()} />,
        document.querySelector('#app')
    )
};

store.subscribe(render);
render();

// 下面是test...
const testAddTodo = () => {
    const listBefore = [];
    const action = {type: 'ADD_TODO', id: 0, text: 'wohahaha'};
    const listAfter = [{id: 0, text: 'wohahaha', completed: false}];

    deepFreeze(listBefore);
    deepFreeze(action);

    expect(todos(undefined, action)).toEqual(listAfter);
};

const testToggleTodo = () => {
    const listBefore = [{id: 0, text: 'wohahaha', completed: false}];
    const action = {type: 'TOGGLE_TODO', id: 0};
    const listAfter = [{id: 0, text: 'wohahaha', completed: true}];

    deepFreeze(listBefore);
    deepFreeze(action);

    expect(todos(listBefore,action)).toEqual(listAfter);
};

const testSetVisibilityFilter = () => {
    const visibilityBefore = 'SHOW_ALL';
    const visibilityAfter = 'SHOW_ACTIVE';
    const action = {type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ACTIVE'};
    expect(setVisibilityFilter(visibilityBefore, action)).toEqual(visibilityAfter);
};
testAddTodo();
testToggleTodo();
testSetVisibilityFilter();
console.log('all test pasted!');