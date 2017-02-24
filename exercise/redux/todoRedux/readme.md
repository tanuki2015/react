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