import update from 'immutability-helper';

const todos = [1,2,3,4];
// 添加
const newtodos = update(todos, {$push: [5]});

// 修改或删除
const deltodos = update(todos, {$splice: [[1,1]]});

console.log(todos, newtodos,deltodos);

export default update;