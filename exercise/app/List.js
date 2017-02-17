import React from 'react';
import ReactDOM from 'react-dom';

const lists = ['JavaScript', 'Java', 'Node', 'Python'];

class List extends React.Component {
  render() {
    return (
      <ul>
        {lists.map((result, index) => {
          return (<li key={index}>{result}</li>);
        })}
      </ul>
    );
  }
}

export default List;
