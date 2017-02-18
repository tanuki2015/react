import React from 'react';

// 这是101的案例
// // TodoApp 组件中包含了显示 Todo 的 TodoList 组件，Todo 的内容透过 props 传入 TodoList 中。由于 TodoList 仅单纯 Render UI 不涉及内部 state 操作是 stateless component，所以使用 Functional Component 写法。需要特别注意的是这边我们用 map function 来迭代 Todos，需要留意的是每个迭代的元素必须要有 unique key 不然会发生错误（可以用自定义 id，或是使用 map function 的第二个参数 index）
// const TodoList = (props) => (
//     <ul>
//         {
//             props.items.map((item) => (
//                 <li key={item.id}>{item.text}</li>
//             ))
//         }
//     </ul>
// )
//
// // 整个 App 的主要组件，这边比较重要的是事件处理的部份，内部有
// class TodoApp extends React.Component {
//     constructor(props) {
//         super(props);
//         this.onChange = this.onChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.state = {
//             items: [],
//             text: '',
//         }
//     }
//     onChange(e) {
//         this.setState({text: e.target.value});
//     }
//     handleSubmit(e) {
//         e.preventDefault();
//         const nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
//         const nextText = '';
//         this.setState({items: nextItems, text: nextText});
//     }
//     render() {
//         return (
//           <div>
//             <h3>TODO</h3>
//             <TodoList items={this.state.items} />
//             <form onSubmit={this.handleSubmit}>
//               <input onChange={this.onChange} value={this.state.text} />
//               <button>{'Add #' + (this.state.items.length + 1)}</button>
//             </form>
//           </div>
//         );
//     }
// }

// 我自己写的myTodolist

function TodoList(props) {
  return (
    <ul>
      { props.items.map((item, index) => (<li key={index}>{item.text}</li>)) }
    </ul>
  );
}

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{ text: 'the first todo thing' }],
      text: '',
    };
  }

  handleOnChange = (e) => {
    this.setState({text: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    {/*防止空值，必须放下面，否则preventDefault不起作用，默认提交表单，所有内容都清空，程序全部退出*/}
    if (!this.state.text) {
      return
    }
    {/*只能concat出一个数组，里面放对象，以为要用setState才能更新state，所以不能用arr.push*/}
    const nextItem = this.state.items.concat([{text: this.state.text}]);
    const nextText = '';
    this.setState({items: nextItem, text: nextText});
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          {/*value如果不写，下次提交会是空值，而不是这次留下的值*/}
          <input onChange={this.handleOnChange} value={this.state.text}></input>
          <button>{'Add #' + (this.state.items.length + 1) }</button>
        </form>
      </div>
    )
  }
}

export default TodoApp;
