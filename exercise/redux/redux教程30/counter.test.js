import counter from './counter';

test('counter 值加1 或 减一', () =>{
    expect( counter(0, {type: 'INCREMENT'}) ).toBe(1);
    expect( counter(1, {type: 'INCREMENT'}) ).toBe(2);
    expect( counter(2, {type: 'DECREMENT'}) ).toBe(1);
    expect( counter(1, {type: 'DECREMENT'}) ).toBe(0);
});
