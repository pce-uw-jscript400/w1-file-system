const fs = require('fs')

const read = function () {
    const petsData = fs.readFileSync('./data/pets.json', 'utf-8')
    const pets = JSON.parse(petsData);
    return pets
}

const hasDuplicate = (pets, name) => {
    const isDuplicate = pets.some(petEl => petEl.name === name)
    // console.log(`isDuplicate returns ${isDuplicate}`)
    if (isDuplicate) {
        return true
    } else {
      return false
    }
}

const create = function (name, kind, age) {
    const pets = read()
    //fs.readFileSync('./data/pets.json', 'utf-8');
    if (hasDuplicate(pets, name)) {
        console.log(`${name} is already a pet!`)
        return 
    } else{
        pets.push({name: name, kind: kind, age: age});
        const newPets = JSON.stringify(pets);
        fs.writeFileSync('./data/pets.json', newPets);
        return newPets;
    }
}

const remove = function (name) {
    const pets = read()
    // fs.readFileSync('./data/pets.json', 'utf-8');
    if (!hasDuplicate(pets, name)) {
        console.log(`No pet of the name of ${name}.`)
        return 
    } else {
        const petIndex = pets.findIndex(pet => pet.name === name); // find the index of the existing pet
        pets.splice(petIndex, 1);
        const newPets = JSON.stringify(pets);
        fs.writeFileSync('./data/pets.json', newPets);
        return newPets
    }
} 

const update = function (name, kind, age) {
    const pets = read()
    const updatedPet = {
        name: name,
        kind: kind,
        age: age
    }
    // fs.readFileSync('./data/pets.json', 'utf-8');
    if (!hasDuplicate(pets, name)) {
        console.log(`${name} does not exist and cannot be modified.`)
        return
    } else {
        const petIndex = pets.findIndex(pet => pet.name === name); // find the index of the existing pet
        pets.splice(petIndex, 1, updatedPet);
        const newPets = JSON.stringify(pets);
        fs.writeFileSync('./data/pets.json', newPets);
        return newPets
    }
} 


// Test
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