import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import Spread from './spread';
import ShowMyName from './ShowMyName';
import Comment from './Comment';
import Timer from './components/Timer';
import ToggleButton from './toggleButton';
import TodoApp from './TodoList';

function App() {
  return (
    <div>
      <TodoApp />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
