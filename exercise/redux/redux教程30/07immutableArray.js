import update from 'immutability-helper';
import deepFreeze from 'deep-freeze';

//利用expect这个模块来测试
import expect from 'expect';
const addCounter = (list) => {
    return [...list, 0];
}

const removeCounter = (list, index) => {
    return [
        ...list.slice(0, index),
        ...list.slice(index + 1)
    ];
};

const incrementCounter = (list,index) => {
    return [
        ...list.slice(0, index),
        list[index] + 1,
        ...list.slice(index + 1)
    ]
};

const testIncrementCounter = () => {
    const listBefore = [2, 3, 4, 5];
    const listAfter = [2, 3, 4, 6];
    deepFreeze(listBefore);

    expect(incrementCounter(listBefore, 3)).toEqual(listAfter);
}

const testRemoveCounter = () => {
    const listBefore = [0, 2, 3];
    const listAfter = [0, 3];

    deepFreeze(listBefore);
    expect(removeCounter(listBefore, 1)).toEqual(listAfter);
};

const testAddCounter = () => {
    const listBefore = [];
    const listAfter = [0];

    deepFreeze(listBefore);
    expect(addCounter(listBefore)).toEqual(listAfter);
}

testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log('test pasted');