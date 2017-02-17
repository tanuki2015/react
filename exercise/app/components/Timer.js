import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { secondsElapsed: 0 };
  }

  // 箭头函数自动把this绑定到组件的实例上，需要stage-1的支持，在atom中会报错，但编译可以通过
  tick = () => {
    this.setState((prevState) => {
      return {secondsElapsed: prevState.secondsElapsed + 1};
    });
  }

// 刚才还在看setState的参数，这里果然就出问题了，向下面这样写果然报错，
// 官网说的是因为setState是异步更新，而我认为是更新后递归更新，导致无限循环
// 用上面的函数方式，就可以保证，取到上一次的值，然后再更新。
//   tick() {
//     this.setState({secondsElapsed: this.state.secondsElapsed + 1});
// }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>已经过了{this.state.secondsElapsed}秒</div>
    );
  }
}

export default Timer;
