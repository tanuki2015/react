import update from 'immutability-helper';
import deepFreeze from 'deep-freeze';

//利用expect这个模块来测试
import expect from 'expect';
const addCounter = (list) => {
    list.push(0);
    return list;
}

const testAddCounter = () => {
    const listBefore = [];
    const listAfter = [0];

    expect(addCounter(listBefore)).toEqual(listAfter);
}

testAddCounter();
console.log('test pasted');