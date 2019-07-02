const path = require('path')
const petsFile = path.join(__dirname, 'data', 'pets.json')
const crud = require('./src/crud.js');

console.log(crud.read())

console.log(crud.create('Duchess', 'bird', 2))
// [
//   { name: 'Meowser', kind: 'cat', age: 3 },
//   { name: 'Duchess', kind: 'bird', age: 2 }
// ]

console.log(crud.create('Duchess', 'bird', 2))
// "Duchess" is already a pet!

console.log(crud.remove('Snoopy'))
// No pet found by the name of "Snoopy"

console.log(crud.remove('Duchess'))
// { name: 'Duchess', kind: 'bird', age: 2 }

console.log(crud.read())
// [ { name: 'Meowser', kind: 'cat', age: 3 } ]

console.log(crud.update('Duchess', 'bird', 3))
// No pet found by the name of "Duchess"

console.log(crud.update('Meowser', 'cat', 4))
// { name: 'Meowser', kind: 'cat', age: 4 }

console.log(crud.read())
// [ { name: 'Meowser', kind: 'cat', age: 4 } ]

console.log(crud.update('Meowser', 'cat', 3))
// { name: 'Meowser', kind: 'cat', age: 3 }