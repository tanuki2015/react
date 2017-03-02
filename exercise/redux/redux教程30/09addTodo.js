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
            ]
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

testAddTodo();
console.log('test is passed!');