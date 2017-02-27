// 这个文件不是必要的，仅仅为了展示store的操作
// 实际应用是在主文件index.js中完成的。
import { createStore } from 'redux';
import todoApp from './reducers';

// 创建store
let store = createStore(todoApp);
