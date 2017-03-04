import React from 'react';
import ReactDom from 'react-dom';
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

const store = createStore(todoApp);

// 2.需要一个getVisibleTodos函数来根据filter过滤todos数组，然后再todoApp中调用后得到需要显示的数组
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

// 到现在为止，写的都是reducer，下面需要一个react组件来呈现view
let nextTodoId = 0;
class TodoApp extends React.Component {
    render() {
        // 3 因为后面要用到todos和visibilityFilter,所以先提取出来
        const {todos, visibilityFilter} = this.props;

        // 调用getVisibleTodos函数，过滤需要显示的todos数组
        // 需要用到的todos数组和visibilityFilter字符串在render TodoApp组件的时候传入
        const visibleTodos = getVisibleTodos(todos, visibilityFilter);
        return (
            <div>
                <input type="text" ref={node => this.input = node}/>
                <button onClick={()=>{
                    store.dispatch({
                        type: 'ADD_TODO',
                        id: nextTodoId++,
                        text: this.input.value,
                    });
                    this.input.value = '';
                }}>Add#
                </button>
                <ul>
                    {visibleTodos.map(todo =>
                        <li key={todo.id}
                            onClick={()=>{
                                store.dispatch({
                                    type: 'TOGGLE_TODO',
                                    id: todo.id,
                                })
                            }}
                            style={{textDecoration: todo.completed? 'line-through': 'none'}}
                        >{todo.text}
                        </li>
                    )}
                </ul>
                <p>
                    Show:
                    {' '}
                    <FilterLink
                        filter="SHOW_ALL"
                        currentFilter = {visibilityFilter}
                    >
                        All
                    </FilterLink>
                    {' '}
                    <FilterLink
                        filter="SHOW_ACTIVE"
                        currentFilter = {visibilityFilter}
                    >
                        Active
                    </FilterLink>
                    {' '}
                    <FilterLink
                        filter="SHOW_COMPLETED"
                        currentFilter = {visibilityFilter}
                    >
                        Completed
                    </FilterLink>
                </p>
            </div>
        )
    }
}

// 1 添加react组件,呈现link
// 注意传入的是一个对象，其实是props对象，用结构赋值取值，所以可以用在函数内部
const FilterLink = ({filter, children, currentFilter}) => {
    // 4 如果当前链接的filter等于传入的filter，则不用发action，仅仅返回一个文本表示当前的状态
    if (filter === currentFilter) {
        return <span>{children}</span>
    }
    return (
        <a href="#"
            onClick={(e)=>{
                e.preventDefault();
                store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter,
                });
            }}
        >
            {children}
        </a>
    )
};

const render = () => {
    ReactDom.render(
        // 把state中的todos数组和setVisibilityFilter作为props传入组件
        <TodoApp {...store.getState()} />,
        document.querySelector('#app')
    );
};

store.subscribe(render);
render();
