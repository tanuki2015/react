// 练习写action

// 首先要明白，todo中的内容用数组存储，每条item是一个object，包含text（内容）和completed（完成否的标记）属性。
// 展示如下：
const todo = [
  {
    text: 'Build my first Redux app',
    completed: true,
  },
  {
    text: 'call my friend',
    completed: false,
  },
];

// 当需要显示这个list的时候，只需要循环输出就行了。
// 但常见的需求是仅仅输出未完成项目，或已完成项目，那么就加上一个过滤条件，同todo一起放到state中保存起来。
// 当需要的时候，只修改这个条件就行了
// 因此整个state的结构如下：

const state = {
  visibilityFilter: 'SHOW_ALL',
  todo: [
    {
      text: 'Build my first Redux app',
      completed: true,
    },
    {
      text: 'call my friend',
      completed: false,
    },
  ],
};

// 然后我们对state能做的操作就是：
// 1. add item
// 2. complete item （通常完成后让他不显示）
// 3. show item  （根据条件，分别是，SHOW_ALL， SHOW_COMPLETED， SHOW_ACTIVE）
// 上面的操作都在reducer中完成，但是，下面我们需要告诉reducer做何种操作，于是需要构造action

// 1. add item
{
  type: 'ADD_TODO',
  text: 'Build my ios app'
}
// 有了上面的action，reducer会添加一条记录，并把它的completed设置为false。

// 2. complete item == toggle_todo
// 在reducer中，需要找出特定item，所以有index，然后再设置他的completed为true。
{
  type: 'TOGGLE_TODO',
  index: 3,
}

// 3. show item
{
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
}

// 根据上面3个action，可以发现，action需要描述一个操作类型，和一个操作数据，仅仅只需要这两条就够了
// 具体如何做，全部交由reducer去处理。

/*
* 写多了action就会发现，我们需要拼好多字符串和对象，于是可以写一个
* 函数，传入一个字符串，它返回一个构造好格式的action对象，这就是action createor
*/
