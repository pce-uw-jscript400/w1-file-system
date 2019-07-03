
console.log('Hello, Node!')
console.log('\n')

const fs = require('fs')
const content = fs.readFileSync('./data/pets.json', 'utf-8')
const pets = JSON.parse(content)

function read() {
    return pets
    
} 

console.log(read())
console.log('\n')

// [ { name: 'Meowser', kind: 'cat', age: 3 } ]


function create(name, kind, age) {
    pets.push({name, kind, age})
    return pets
} 

console.log(create('Duchess','bird', 2))
console.log('\n')
// [
//   { name: 'Meowser', kind: 'cat', age: 3 },
//   { name: 'Duchess', kind: 'bird', age: 2 }
// ]


function create(name, kind, age) {
    const pet = pets.find( pet => pet.name === name )

    if (pet) {
        return pet.name + ' is already a pet!'
    }
    else {
        pets.push({name, kind, age})
        return pets
    }

} 

console.log(create('Duchess','bird', 2))
console.log('\n')
// Duchess is already a pet!

// console.log(create('Pow','dog', 1))
// console.log('\n')
// [ { name: 'Meowser', kind: 'cat', age: 3 },
// { name: 'Duchess', kind: 'bird', age: 2 },
// { name: 'Pow', kind: 'dog', age: 1 } ]


function remove(name) {
    const pet = pets.find( pet => pet.name === name )
    if (pet) {
        return pet.name + ' will be remove'
    }
    else {
        return 'No pet found by the name of ' + name 
    }
} 

console.log(remove('Snoopy'))
console.log('\n')
// No pet found by the name of "Snoopy"


function remove(name) {
    //find object pet with that name 
    const pet = pets.find( pet => pet.name === name )
    //if object exist do this
    if (pet) {   
        // find object index
        var removeIndex = pets.map(function(item) { return item.name; }).indexOf(name);
        // remove from pets
        pets.splice(removeIndex, 1);
    }
    //if object with that name does not exist
    else {
        return 'Can not remove, no pet found by the name of ' + name 
    }
} 

console.log(remove('Duchess'))
// remove from pets this object { name: 'Duchess', kind: 'bird', age: 2 }
console.log('\n')


console.log(read())
console.log('\n')
// [ { name: 'Meowser', kind: 'cat', age: 3 } ]

function update(name, kind, age) {
    const pet = pets.find( pet => pet.name === name )
    if (pet) {   
        var idx = pets.map(function(item) { return item.name; }).indexOf(name);
        pets[idx].name = name
        pets[idx].kind = kind
        pets[idx].age = age

    }
    else {
        return 'No pet found by the name of ' + name 
    }
} 

console.log(update('Duchess', 'bird', 3))
console.log('\n')
// No pet found by the name of "Duchess"

console.log(update('Meowser', 'cat', 4))
console.log(read())
// { name: 'Meowser', kind: 'cat', age: 4 }

console.log(update('Meowser', 'cat', 3))
console.log(read())
// { name: 'Meowser', kind: 'cat', age: 3 }