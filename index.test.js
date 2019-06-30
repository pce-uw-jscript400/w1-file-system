const { create, read, update, remove } = require('./index');

test('read', () => {
    const expected = [ { name: 'Meowser', kind: 'cat', age: 3 } ];
    expect(read()).toMatchObject(expected);
});