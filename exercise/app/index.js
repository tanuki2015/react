import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import Spread from './spread';
import ShowMyName from './ShowMyName';
import Comment from './Comment';
import Timer from './components/Timer';
import ToggleButton from './toggleButton';
import TodoApp from './TodoList';
import Greeting from './components/Greeting';
import Page from './components/Page.js';

import store from '../redux/app/store.js'

function App() {
  return (
    <div>
      {/* 根据jsx语法，isLogged属性默认值为true */}
      <Greeting isLogged />
      <TodoApp />
      <Page />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
