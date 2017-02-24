import React from 'react';
import ReactDOM from 'react-dom';

class AddTodo extends React.Component {
    // 不操作state，所以不用constructor，也不用在里面定义state。
    render() {
        return (
            <div>
                <input type="text" ref="input"/>
                <button onClick={this.handleClick}>Add</button>
            </div>
        );
    }

    handleClick = (e) => {
        e.preventDefault();
        const node = ReactDOM.findDOMNode(this.refs.input);
        const text = node.value.trim();
        this.props.onAddClick(text);
        node.value = '';
    }
}

// 需要传入一个方法，处理按钮的行为。
AddTodo.propTypes = {
    onAddClick:  React.PropTypes.func.isRequired,
};

export default AddTodo;
