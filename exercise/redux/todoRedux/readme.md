我们的概要设计很简单。我们想要显示一个 todo 项的列表。一个 todo 项被点击后，会增加一条删除线并标记 completed。我们会显示用户新增一个 todo 字段。在 footer 里显示一个可切换的显示全部/只显示 completed 的/只显示 incompleted 的 todos。

以下的这些组件（和它们的 props ）就是从这个设计里来的：

1. AddTodo 输入字段的输入框和按钮。
onAddClick(text: string) 当按钮被点击时调用的回调函数。

2. TodoList 用于显示 todos 列表。

- todos: Array 以 { text, completed } 形式显示的 todo 项数组。
onTodoClick(index: number) 当 todo 项被点击时调用的回调函数。
Todo 一个 todo 项。

- text: string 显示的文本内容。

- completed: boolean todo 项是否显示删除线。
- onClick() 当 todo 项被点击时调用的回调函数。

3. Footer 一个允许用户改变可见 todo 过滤器的组件。
filter: string 当前的过滤器为： 'SHOW_ALL'、 'SHOW_COMPLETED' 或 'SHOW_ACTIVE'。
onFilterChange(nextFilter: string)： 当用户选择不同的过滤器时调用的回调函数。

按照这个设计要求完成react组件，唯一不同的是，在组件中不写state，仅仅从props中拿到数据后渲染。

总结：写react其实不难，关键是思路，主要考虑3个问题：
1. ui--先在render中写ui，跑通流程看到效果后再写交互
2. 交互--跟哪些事件做交互，写事件。
3. 在使用redux后还要考虑总体的state设计，明白了具体的数据结构后才好写交互。

## 按照上面的要求做完纯react的组建后，就可以开始写redux需要的东西了。
1. action creator。
2. reducer。
3. store。

看到这里被connect卡住了，原来这个文档翻译不全，然后去http://cn.redux.js.org/docs/，还是决定先看
redux作者的30个视频教程，虽然是全英文，但看起来好像还行，转去redux教程30目录。


