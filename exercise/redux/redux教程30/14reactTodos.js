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

const store = createStore(todoApp);

// 到现在为止，写的都是reducer，下面需要一个react组件来呈现view
let nextTodoId = 0;
class TodoApp extends React.Component {
    render() {
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
                    {this.props.todos.map(todo =>
                        <li key={todo.id}>
                            {todo.text}
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

const render = () => {
    ReactDom.render(
        <TodoApp todos={store.getState().todos} />,
        document.querySelector('#app')
    );
};

store.subscribe(render);
render();
