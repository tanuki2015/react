import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import Spread from './spread';
import ShowMyName from './ShowMyName';
import Comment from './Comment';
import Timer from './components/Timer';
import ToggleButton from './toggleButton';
import TodoApp from './TodoList';
import Greeting from './components/Greeting'

function App() {
  return (
    <div>
      <Greeting isLogged={true} />
      <TodoApp />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
