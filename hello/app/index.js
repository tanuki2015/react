import React from 'react';
import ReactDOM from 'react-dom';

有状态的组件
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
      </div>
    );
  }
}

// 无状态了的组件
// const App = () => (<h1>Hello function stateless components</h1>);

ReactDOM.render(<App />, document.getElementById('app'));
