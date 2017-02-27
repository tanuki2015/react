import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from './actions';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
    render() {
        // 通过调用 connect() 注入:
        const { dispatch, visibleTodos, visibilityFilter } = this.props;
        return (
            <div>
                <AddTodo onAddClick={text => dispatch(addTodo(text)) }/>
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
