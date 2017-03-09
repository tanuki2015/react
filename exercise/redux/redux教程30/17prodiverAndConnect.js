import React from 'react';
import ReactDom from 'react-dom';
import { createStore, combineReducers } from 'redux';
import {Provider, connect} from 'react-redux';
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
    visibilityFilter: setVisibilityFilter,
});

// 为了展示符合filter link的项目，先做一个数组过滤，把满足条件的直接传递给todoApp

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter(item => !item.completed);
        case 'SHOW_COMPLETED':
            return todos.filter(item => item.completed);
    }
};

// extract todoApp div-ul-li(相对于提取之前的内容，见15todosSetvisibity.js)
// 1. 去掉key，在上级list那一级调用的时候制定
// 2. 需要的参数全部默认从this.props传入，通过解构赋值拿到
const ListItem = ({text, onClick, completed}) => {
    return (
        <li
            onClick={onClick}
            style={{textDecoration: completed ? 'line-through' : 'none'}}
        >
            {text}
        </li>)
};

// extract todoApp div-ul
const List = ({todos, onListItemClick}) => {
    return (
        <ul>
            {todos.map(todo => (
                <ListItem
                    {...todo}
                    key={todo.id}
                    onClick={() => {onListItemClick(todo.id)}}
                />
            ))}
        </ul>
    )
};

// extract addTodo div-input, button

let Addtodo = ({dispatch}) => {
    let input;
    return (
        <div>
            <input type="text" ref={(node) => {input = node}} />
            <button onClick={()=>{
                dispatch({
                    type: 'ADD_TODO',
                    id: todoId++,
                    text: input.value
                });
                input.value = '';
            }}>ADD</button>
        </div>
    )
};

// 用connect替换Addtodo,通过connect默认注入dispatch，直接省略传参，目标模块显式接受就行了
Addtodo = connect()(Addtodo);

// extract Footer div-p
const Footer = ({visibilityFilter, onClickLink}) => {
    return (
        <p>
            SHOW
            {': '}
            <FilterLink
                filter="SHOW_ALL"
            >
                ALL
            </FilterLink>
            {', '}
            <FilterLink
                filter="SHOW_ACTIVE"
            >
                ACTIVE
            </FilterLink>
            {', '}
            <FilterLink
                filter="SHOW_COMPLETED"
            >
                COMPLETED
            </FilterLink>

        </p>
    )
};

// 使用connect替换掉VisibleTodoList
const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onListItemClick: id => dispatch({type: 'TOGGLE_TODO', id})

    }
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(List);

// 增加一个中间组件，连接redux和listTodo组件, 有了connect，这个不用手写了
// class VisibleTodoList extends React.Component {
//     componentDidMount() {
//         this.unSubscribe = store.subscribe(() => this.forceUpdate())
//     }
//
//     componentWillUnmount() {
//         this.unSubscribe();
//     }
//     render() {
//         const props = this.props;
//         const state = store.getState();
//         return (
//             <List
//
//             />
//         )
//     }
// }

// create todoApp component
let todoId = 0;
const TodoApp = () =>{
    return (
        <div>
            <Addtodo />

            <VisibleTodoList/>

            <Footer />
        </div>
    )
};

// create filterLink component, todoApp会用到
// 2. 改成class，自己从state中拿到需要的数据
class FilterLink extends React.Component{
    componentDidMount() {
        this.unSubscribe = store.subscribe(() => this.forceUpdate())
    }

    componentWillUnmount() {
        this.unSubscribe();
    }

    render() {
        const props = this.props;
        const state = store.getState();
        return (
            <Link
                active = {state.visibilityFilter === props.filter}
                onClick={()=>{
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter: props.filter
                    });
                }}
            >
                {props.children}
            </Link>
        )
    }

}

// 1. 为了构建中间组件，先把filterLink中的view部分拿出来，做一个 presentational component
const Link = ({active, children, onClick}) => {
    if (active) {
        return <span>{children}</span>
    }
    return (
        <a href="#"
           onClick={(e)=>{
               e.preventDefault();
               onClick();
           }}
        >
            {children}
        </a>
    )
};



// create store
const store = createStore(rootReducer);


ReactDom.render(
    <Provider store={store} >
        <TodoApp />
    </Provider>,
    document.querySelector('#app')
);



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