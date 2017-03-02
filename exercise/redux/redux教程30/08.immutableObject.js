import expect from 'expect';
import deepFreeze from 'deep-freeze';

const toggleTodo = (todo) => {
    return {...todo, complete: !todo.complete}
};

const testtoggleTodo = () => {
    const todoBefore = {
        id: 0,
        text: 'hey! learn redux!',
        complete: false,
    };

    const todoAfter = {
        id: 0,
        text: 'hey! learn redux!',
        complete: true,
    };

    deepFreeze(todoBefore);
    expect(toggleTodo(todoBefore)).toEqual(todoAfter);
};

testtoggleTodo();
console.log('toggle is success!');