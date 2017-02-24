import React from 'react';
import ReactDOM from 'react-dom';
import AddTodo from './AddTodo';

class App extends React.Component {
    render() {
        return (
            <AddTodo onAddClick={this.handleAdd}/>
        )
    }

    handleAdd = (text) => {
        console.log(text);
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
