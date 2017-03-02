import deepFreeze from 'deep-freeze';
import expect from 'expect';

const todo = (state,action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                    id: action.id,
                    text: action.text,
                    completed: false,
                };

        case 'TOGGLE_TODO':
            if (action.id !== state.id) {
                return state;
            }

            return  {...state, completed: !state.completed};

        default:
            return state;
    }
};

const addTodo = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map((item) => {
                return todo(item, action);
            });
        default:
            return state;
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