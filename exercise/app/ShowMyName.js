import React from 'react';
import ReactDOM from 'react-dom';

class ShowMyName extends React.Component {
  render() {
    return (
      <h1>my name is {this.props.name}</h1>
    );
  }
}

ShowMyName.propTypes = {
  name: React.PropTypes.string,
}
ShowMyName.defaultProps = {
  name: 'nicolas',
}

export default ShowMyName;
