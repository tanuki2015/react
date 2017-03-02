import deepFreeze from 'deep-freeze';
import expect from 'expect';

const addTodo = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false,
                }
            ];
        case 'TOGGLE_TODO':
            return state.map(todo => {
                if (todo.id !== action.id) {
                    return todo;
                }
                return {...todo, completed: !todo.complete};
            });
    }
};

const testAddTodo = () => {
    const stateBefore = [];

    const action = {
        id: 0,
        type: 'ADD_TODO',
        text: 'learning redux',
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    const stateAfter = [{
        id: 0,
        text: 'learning redux',
        completed: false,
    }];

    expect(addTodo(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
    const stateBefore = [{
            id: 0,
            text: 'learning redux',
            completed: false,
        },
        {
            id: 1,
            text: 'go shopping',
            completed: false,
        }
    ];

    const action = {
        type: 'TOGGLE_TODO',
        id: 1,
    };

    const stateAfter = [{
        id: 0,
        text: 'learning redux',
        completed: false,
    },
        {
            id: 1,
            text: 'go shopping',
            completed: true,
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(addTodo(stateBefore, action)).toEqual(stateAfter);

};

testAddTodo();
testToggleTodo();
console.log('test is passed!');