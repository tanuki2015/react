import React from 'react';

class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
  }

  handleClick = () => {
    this.setState(prevState => ({isToggleOn: !prevState.isToggleOn}));
    console.log('this is ',this);
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'yes' : 'no'}
      </button>
    )
  }
}

export default ToggleButton;
