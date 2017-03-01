import update from 'immutability-helper';
import {expect, assert} from 'chai';

const todos = [1,2,3,4];
// 添加
const newtodos = update(todos, {$push: [5]});
expect(todos).to.equal([1,2,3,4]);

// 修改或删除
const deltodos = update(todos, {$splice: [[1,1]]});

console.log(todos, newtodos,deltodos);



export default update;