# redux作者的30个小视频教程笔记
本打算写在有道云笔记上，但是有道云笔记经常会失去响应几秒，搞得好烦。

写了6章，发现https://github.com/tayiorbeii/egghead.io_redux_course_notes/blob/master/02-Reducer_and_Store.md
是官方的笔记

这个webpack插件是要的，因为我的html中需要它注入内容：html-webpack-plugingn

## 01 state 树
再看这个redux教程http://cn.redux.js.org/docs/时候问题特别多，前面对要操作的数据都没有描述清楚，所以很难懂。好不容易看到后面，又被connect卡住，而且代码中的todo.id这个属性前面根本没有，搞得人一头雾水。

我坚信，一个东西如果学不好，那一定是老师没有教好。所以肯定是这个教程有问题。于是找到redux作者的视频，硬着头皮看，原来人家第一课就交代清楚了todo list 的 state数据结构：
```
const state = {
    todos: [{
        id: 0,
        text: 'hey',
        completed: true,
    },{
        id: 1,
        text: 'ho',
        completed: false,
    }],
    visibilityFilter: "SHOW_ACTIVE",
}
```

### 简单的counter案例则只需要一个number变量：
```
const counter = 0;
```

### 有多个counter的列表则需要用array：
```
const counters = [0, 0];
```

- mutations 改变
- cross out 删除

## 02 action对象表示需要改变的state

### 用action描述state
action中的type是必须的。

### 一个counter仅仅需要INCREMENT，和DECREMENT.
```
{
    type: "INCREMENT"
}
// 或者
{
    type: "DECREMENT"
}
```

### 多个counters 则还需要 ADD_COUNTER， REMOVE_COUNTER
```
{
    type: "ADD_COUNTER",
}
// or
{
    type: "REMOVE_COUNTER",
}
```
#### 点击每个counter时候，还需要索引，表示哪个counter
```
{
    type: "INCREMENT",
    index: 1,
}
```

### 这种可伸缩的模式适应于中等和复杂的app，组件无需知道具体什么内容被添加，他只需要传递action就可以了。


#### 添加todo项的action
```
{
    type: "ADD_COUNTER",
    text: "hey",
    id: 3, // 注意，应该是讲错了，这一项应该在reducer中生成
            // 因为添加内容的时候无需了解自身todo数组中有多少项目
}
```

#### toggle todo的时候
```
{
    type: "TOGGLE_TODO",
    id: 2,
}
```

### 设置显示方式得到时候（显示全部？还是已完成？或未完成）
```
{
    type: "SET_VISIBILITY_FILTER",
    filter: "SHOW_ALL",
}
```

总结：

state tree 是只读的，唯一改变state的方式是发送action。action是用原始js对象描述的需要改变的内容。

- scales 缩放
- medium 中等规模
- sequential 连续的

## 03 pure function and impure function
1. 同样参数返回同样结果。
2. 不能修改传入的参数。（为什么修改参数的时候会有提示，就是这个原因）
3. 没有外部的的网络请求或数据库update。

- mindful 警觉，留意

## 04 reducer function
1. 处理state的函数是reducer，它必须是纯函数。他拿到previous state，返回next state。
2. 虽然全局只有一个state，但大型app中速度也不慢，因为他只修改需要改变的部分，而其他部分则保留不变。（比如修改todolist中的显示方式时候，todolist这个内容数组却不用修改）。

- predictable 可预测

## 05 写一个counter的reducer
为了在jsbin中支持expect，需要引入  <script src="https://npmcdn.com/expect/umd/expect.min.js"></script>

开始是这样的：
```
function counter(state, action) {
    if (action.type === "ENCREMENT") {
        return state + 1;
    } else if (action.type === "DECREMENT") {
        return state -1;
    }
}
```

如果没有传入state或action中的type无法识别，需要容错：
```
function counter(state = 0, action) {
    if (action.type === "ENCREMENT") {
        return state + 1;
    } else if (action.type === "DECREMENT") {
        return state -1;
    }
    return state;
}
```

改用箭头函数，并使用switch简化：
```
const counter = (state = 0, action) => {
    switch (action.type) {
        case "ENCREMENT":
            return state + 1;
        case "DECREMENT":
            return state -1;
        default:
            return state;
    }
}
```


- convention 约定
- flaws 裂痕
- cosmetic 装饰品
- tweaks 扭
- cosmetic tweaks 调整，修饰
- bunch 一串

## 06 Store Methods: getState(), dispatch(), and subscribe()
 1. 需要redux提供的createStore方法。
 2. createStore包括三个方法：
     1. getState() 取当前state
     2. dispatch() 发送action
     3. subscribe() 订阅事件,返回值是一个函数，用于取消订阅。
     
 
 ### 注意： 这里引用redux create方法的时候有问题，运行的时候报错。
```
// wrong
import createStore from 'redux'

// right
import { createStore } from 'redux'

```
 
 - suffice v. 满足
 - principles 原则
 - equivalent 相当于
 - retrieves 取回，检索
 - reflect 反映，映射
 
 ## 07 避免修改原数组的更新操作
 比如数组中某项加一：
 
 文章中的方法是用slice和spread操作：
 1. 取出并展开index之前的内容。
 2. 取出index这一项的内容并改变。
 3. 取出并展开index之后的内容。
```
// index 是需要修改的数组索引
newArr = [
    ...arr.slice(0,index),
    arr.[index] + 1,
    ...arr.slice(inde+1)
    ]
```

减一的操作：
```
newArr = [
    ...arr.slice(0,index),
    ...arr.slice(inde+1)
]
```

这种操作一多，效率就不好了，可以引入react的update。
```
npm install --save immutability-helper;

import update from 'immutability-helper';

```
上面的加一和减一操作如下：
```
const todos = [1,2,3,4];
// 添加
const newtodos = update(todos, {$push: [5]});

// 修改或删除
const deltodos = update(todos, {$splice: [[1,1]]});

```

测试方面，chai的expect无法比较数组，于是利用expect这个模块来测试

在探索了immutable.js后，还是觉得尽量用原生的方式来操作state比较好，
虽然啰嗦了写，可是immutable太多的语法糖不容易消化，用法容易与原生搞混，也麻烦。

### 07immutableArray.js增加了测试。
在写代码的时候写测试感觉真不错，以前都是用log看，现在用expect直接跑更加可靠方便。

这难道就是传说中的TDD？

## 08 对象的no mutation操作
使用es7的spread

- flip 轻弹， （点击切换）
- assign 分配

## 09 添加todo项的reducer

- corresponds 一致，符合
- despite 不管
- proposed 推荐
- recap 扼要重述
- representing 代表
- intended 故意， 预期的
- equality 等式

## 10 toggleTodo

- matter adj.重要
- precaution 警告
- inverted 反转

## 11 compose reducer

为了保持root reducer的整洁，把具体操作分离出来，
这样root reducer 就很容易保持简洁。

- concerns 关注点
- As a matter of convention根据惯例
- delegate 委派
- abstract 抽象

## 14 react todos
### ref的回调用法
以前用ref的字符串，通过this.refs.name来引用dom节点。

当dom节点是input的时候还需要些handle函数。

而现在用ref的回调函数，直接能拿到值。
```
<input type="text" ref={node => this.input = node}/>
                <button onClick={()=>{
                        store.dispatch({
                            type: 'ADD_TODO',
                            id: nextTodoId++,
                            text: this.input.value,
                        });
                        this.input.value = '';
                    }}>Add#
                </button>

```

## 15 setVisibity
为了根据visibity的filter来显示不同的内容，需要做下面几件事情：
1. 需要一个FilterLink组件显示链接
```
.
. // Reducer code, etc.
.
// 注意传入的是一个对象，其实是props对象，用结构赋值取值，所以可以用在函数内部
const FilterLink = ({filter, children}) => {
    return (
        <a href="#"
            onClick={(e)=>{
                e.preventDefault();
                store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter,
                });
            }}
        >
            {children}
        </a>
    )
};
.
.
.

```

2. 在todoApp中render
```
.
. // TodoApp component stuff including the the <ul> of todo items...
. // This <p> tag is to be rendered below the list.
<p>
  Show:
  {' '}
  <FilterLink
    filter='SHOW_ALL'
  >
    All
  </FilterLink>
  {' '}
  <FilterLink
    filter='SHOW_ACTIVE'
  >
    Active
  </FilterLink>
  {' '}
  <FilterLink
    filter='SHOW_COMPLETED'
  >
    Completed
  </FilterLink>
</p>
.
. // close the containing `<div>` and the TodoComponent
.
```

3. 需要一个getVisibleTodos函数来根据filter过滤todos数组，然后再todoApp中调用后得到需要显示的数组。
```
const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter(item => !item.completed);
        case 'SHOW_COMPLETED':
            return todos.filter(item => item.completed);
    }
};

```

4. 在todoApp组件中调用
```
// 调用getVisibleTodos函数，过滤需要显示的todos数组
// 需要用到的todos数组和visibilityFilter字符串在render TodoApp组件的时候传入
const visibleTodos = getVisibleTodos(this.props.todos, this.props.visibilityFilter);
.
.
.
<ul>
                    {visibleTodos.map(todo =>
                        <li key={todo.id}
                            onClick={()=>{
                                store.dispatch({
                                    type: 'TOGGLE_TODO',
                                    id: todo.id,
                                })
                            }}
                            style={{textDecoration: todo.completed? 'line-through': 'none'}}
                        >{todo.text}
                        </li>
                    )}
                </ul>

```

5. 在render todoApp的时候传入参数
```
const render = () => {
    ReactDom.render(
        // 把state中的todos数组和setVisibilityFilter作为props传入组件
        <TodoApp {...store.getState()} />,
        document.querySelector('#app')
    );
};
```

6. 让连接显示不同的样子，以示区别


