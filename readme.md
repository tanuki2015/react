hello文件夹是一个基本的模板，已经正确配置了webpack，可以解析es6和react。

新建项目可以用它做基础，拷贝过来用。

问题：

1. 箭头函数自动把this绑定到组件的实例上，需要stage-1的支持，在atom中会报错，但编译可以通过
```
tick = () => {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
}
```
