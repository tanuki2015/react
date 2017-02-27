import React from 'react';
import ReactDOM from 'react-dom';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Footer from './Footer';

import { createStore } from 'redux';
import todoApp from './reducers';
import { Provider } from 'react-redux'

// 创建store
let store = createStore(todoApp);

// 连接react和redux
// 第一步 利用provider把state提供给react组件
const rootElement = document.getElementById('app');


class App extends React.Component {
    render() {
        return (
            <div>
                <AddTodo onAddClick={text => console.log('addtodo is clicked!', text) }/>
                <TodoList
                    onTodoClick={todo => console.log('todoList is clicked!', todo)}
                    todos= {[{
                        text: 'Use Redux',
                        completed: true
                    }, {
                        text: 'Learn to connect it to React',
                        completed: false
                    }]}
                />
                <Footer
                    onFilterChange={filter => console.log('filter change', filter)}
                    filter={'SHOW_ALL'}
                />
            </div>
        )
    }

}


ReactDOM.render(<App />, document.getElementById('app'));
