const path = require('path')
const petsFile = path.join(__dirname, 'data', 'pets.json')

// use fs to work with the file system
const fs = require('fs');

// read in contents of the pets.json file
const contents = fs.readFileSync(petsFile, 'utf-8')
// parse the content so it is in JS
const pets = JSON.parse(contents)

// create a pet
function create(petName, petType, petAge) {
    if (pets.find(pet => pet.name === petName)) {
        console.log('"'+ petName + '" is already a pet!')
    } else {
        // add pet to pets array
        pets.push({name: petName, kind: petType, age: petAge})
        // transform back to a string
        const stringy = JSON.stringify(pets)
        // write the array back to the file
        fs.writeFileSync(petsFile, stringy)
    }
}

// read/output a pet
function read() {
    // just return pets
    return pets
}

// update a pet
function update(petName, petType, petAge) {
    // first, find if there is a pet to update
    if (pets.find(pet => pet.name === petName)) {
        // find the index of this pet
        petIndex = pets.findIndex(pet => pet.name === petName);
        // update the array with the new pet information
        pets[petIndex] = {name: petName, kind: petType, age: petAge}
        // convert back to a string
        const stringy = JSON.stringify(pets)
        // write the array back to the file
        fs.writeFileSync(petsFile, stringy)
    } else {
        // if there isn't a pet by this name, return error
        console.log('No pet found by the name of "' + petName +'"')
    }
}

// delete a pet
function remove(petName) {
    // first, find if there is a pet to remove
    if (pets.find(pet => pet.name === petName)) {
        // remove from the array based on the index
        pets.splice(pets.findIndex(pet => pet.name === petName), 1)
        // convert back to a string
        const stringy = JSON.stringify(pets)
        // write array back to file
        fs.writeFileSync(petsFile, stringy)
    } else {
        // if there isn't a pet by this name, return error
        console.log('No pet found by the name of "' + petName +'"')
    }   
}

// TESTS
console.log(read())
// [ { name: 'Meowser', kind: 'cat', age: 3 } ]

console.log(create('Duchess', 'bird', 2))
// [
//   { name: 'Meowser', kind: 'cat', age: 3 },
//   { name: 'Duchess', kind: 'bird', age: 2 }
// ]

console.log(create('Duchess', 'bird', 2))
// "Duchess" is already a pet!

console.log(remove('Snoopy'))
// No pet found by the name of "Snoopy"

console.log(remove('Duchess'))
// { name: 'Duchess', kind: 'bird', age: 2 }

console.log(read())
// [ { name: 'Meowser', kind: 'cat', age: 3 } ]

console.log(update('Duchess', 'bird', 3))
// No pet found by the name of "Duchess"

console.log(update('Meowser', 'cat', 4))
// { name: 'Meowser', kind: 'cat', age: 4 }

console.log(read())
// [ { name: 'Meowser', kind: 'cat', age: 4 } ]

console.log(update('Meowser', 'cat', 3))
// { name: 'Meowser', kind: 'cat', age: 3 }