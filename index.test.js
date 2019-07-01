const { create, read, update, remove } = require('./index');
const fs = require('fs');

beforeEach(() => {
    fs.copyFileSync('data/pets.sample.json', 'data/pets.json');
});

test('read', () => {
    const expected = [{ name: 'Meowser', kind: 'cat', age: 3 }];
    expect(read()).toMatchObject(expected);
});

test('create', () => {
    let expected = [{ name: 'Meowser', kind: 'cat', age: 3 }, { name: 'Duchess', kind: 'bird', age: 2 }];
    expect(create('Duchess', 'bird', 2)).toMatchObject(expected);
    expected = "\"Duchess\" is already a pet!";
    expect(create('Duchess', 'bird', 2)).toBe(expected);
});

test('remove', () => {
    create('Duchess', 'bird', 2);
    let expected = "No pet found by the name of \"Snoopy\"";
    expect(remove('Snoopy')).toBe(expected);
    expected = { name: 'Duchess', kind: 'bird', age: 2 };
    expect(remove('Duchess')).toMatchObject(expected);
    expected = [{ name: 'Meowser', kind: 'cat', age: 3 }];
    expect(read()).toMatchObject(expected);
});

test('update', () => {
    let expected = "No pet found by the name of \"Duchess\"";
    expect(update('Duchess', 'bird', 3)).toBe(expected);
    expected = { name: 'Meowser', kind: 'cat', age: 4 }
    expect(update('Meowser', 'cat', 4)).toMatchObject(expected);
    expected = [{ name: 'Meowser', kind: 'cat', age: 4 }];
    expect(read()).toMatchObject(expected);
});
