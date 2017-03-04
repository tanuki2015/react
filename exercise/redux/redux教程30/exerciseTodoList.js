// 做练习
import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import expect from 'expect';
import deepFreeze from 'deep-freeze';

const todos = (state = [], action) => {
    switch  (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {id: action.id, text: action.text, completed: false}
            ];
        case 'TOGGLE_TODO':
            return state.map(item => {
                if (item.id !== action.id) {
                    return item;
                }

                return {
                    ...item,
                    completed: !item.completed
                }
            });
        default:
            return state;
    }
};

const testTodos = () => {
    const listBefore = [];
    const action = {type: 'ADD_TODO', id: 0, text: 'wohahaha'};
    const listAfter = [{id: 0, text: 'wohahaha', completed: false}];

    deepFreeze(listBefore);
    deepFreeze(action);

    expect(todos(undefined, action)).toEqual(listAfter);
};

testTodos();
console.log('all test pasted!');