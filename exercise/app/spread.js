import React from 'react';
import ReactDOM from 'react-dom';

// 返回的组件如果属性值多，可以用spread方式放入
const props = {
  style: "width:20px",
  className: "main",
  value: "yo",
};

class Spread extends React.Component {
  render() {
    return (
      <h1 {...this.props }>hahaha</h1>
    );
  }
}

export default Spread;
