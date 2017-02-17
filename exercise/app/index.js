import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import Spread from './spread';
import ShowMyName from './ShowMyName';
import Comment from './Comment';
import Timer from './components/Timer';
import Timer101 from '../101Timer';

function App () {
  return (
    <div>
      <List />
      <Spread />
      <ShowMyName name="neo" />
      <ShowMyName />
      <Comment />
      <Timer />
      <Timer101 />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
