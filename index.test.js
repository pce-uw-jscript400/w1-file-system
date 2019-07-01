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
    const expected = [{ name: 'Meowser', kind: 'cat', age: 3 }, { name: 'Duchess', kind: 'bird', age: 2 }];
    expect(create('Duchess', 'bird', 2)).toMatchObject(expected);
});

test('createDuplicate', () => {
    create('Duchess', 'bird', 2);
    const expected = "\"Duchess\" is already a pet!";
    expect(create('Duchess', 'bird', 2)).toBe(expected);
});

test('removeNonexistant', () => {
    create('Duchess', 'bird', 2);
    const expected = "No pet found by the name of \"Snoopy\"";
    expect(remove('Snoopy')).toBe(expected);
});

test('removeExistant', () => {
    create('Duchess', 'bird', 2);
    const expected = { name: 'Duchess', kind: 'bird', age: 2 };
    expect(remove('Duchess')).toMatchObject(expected);
});

test('updateNonexistant', () => {
    create('Duchess', 'bird', 2);
    remove('Duchess');
    const expected = "No pet found by the name of \"Duchess\"";
    expect(update('Duchess', 'bird', 3)).toBe(expected);
});

test('updateExistant', () => {
    create('Duchess', 'bird', 2);
    remove('Duchess');
    const expected = { name: 'Meowser', kind: 'cat', age: 4 }
    expect(update('Meowser', 'cat', 4)).toMatchObject(expected);
});

test('readAfterUpdate', () => {
    create('Duchess', 'bird', 2);
    remove('Duchess');
    update('Meowser', 'cat', 4);
    const expected = [{ name: 'Meowser', kind: 'cat', age: 4 }];
    expect(read()).toMatchObject(expected);
});