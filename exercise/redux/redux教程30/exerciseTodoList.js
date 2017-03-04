// 做练习
import React from 'react';
import ReactDom from 'react-dom';
import { createStore, combineReducers } from 'redux';
import expect from 'expect';
import deepFreeze from 'deep-freeze';

// reducer，被todos reducer调用，处理todos中的todo项目，typeof {}
const todo = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

// reducer，处理state中todos，typeof array
const todos = (state = [], action) => {
    switch  (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(item => todo(item, action));
        default:
            return state;
    }
};

// reducer，处理state中visibilityFilter，typeof string
const setVisibilityFilter = (state = 'SHOW_ALL', action) => {
    switch  (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

// combineReducers
const rootReducer = combineReducers({
    todos,
    setVisibilityFilter,
});

// create todoApp component


// create store
const store = createStore(rootReducer);

const render = () => {
    ReactDom.render(

    )
}

// 下面是test...
const testAddTodo = () => {
    const listBefore = [];
    const action = {type: 'ADD_TODO', id: 0, text: 'wohahaha'};
    const listAfter = [{id: 0, text: 'wohahaha', completed: false}];

    deepFreeze(listBefore);
    deepFreeze(action);

    expect(todos(undefined, action)).toEqual(listAfter);
};

const testToggleTodo = () => {
    const listBefore = [{id: 0, text: 'wohahaha', completed: false}];
    const action = {type: 'TOGGLE_TODO', id: 0};
    const listAfter = [{id: 0, text: 'wohahaha', completed: true}];

    deepFreeze(listBefore);
    deepFreeze(action);

    expect(todos(listBefore,action)).toEqual(listAfter);
};

const testSetVisibilityFilter = () => {
    const visibilityBefore = 'SHOW_ALL';
    const visibilityAfter = 'SHOW_ACTIVE';
    const action = {type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ACTIVE'};
    expect(setVisibilityFilter(visibilityBefore, action)).toEqual(visibilityAfter);
};
testAddTodo();
testToggleTodo();
testSetVisibilityFilter();
console.log('all test pasted!');