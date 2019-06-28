const path = require('path')
const petsFile = path.join(__dirname, 'data', 'pets.json')
const fs = require('fs')

function read() {
    const file = JSON.parse(fs.readFileSync(petsFile, 'utf-8'))
    return file;
}

function doesPetExists(newPetName) {
    const pets = read();
    return pets.some(function (pet) {
        return pet.name === newPetName;
    })
}

function create(name, kind, age) {
    const pets = read();
    const newPet = { name: name, kind: kind, age: age };

    if (doesPetExists(newPet.name)) {
        return `\"${newPet.name}\" is already a pet!`;
    } else {
        pets.push(newPet)
        fs.writeFileSync(petsFile, JSON.stringify(pets))
        return read();
    }
}

function remove(petName) {
    if (doesPetExists(petName)) {
        const removedPet = read().filter(pet => pet.name == petName);
        const pets = read().filter(pet => pet.name != petName);
        fs.writeFileSync(petsFile, JSON.stringify(pets));
        return removedPet;
    } else {
        return `No pet found by the name of \"${petName}\"`;
    }
}

function update(name, kind, age) {
    if (doesPetExists(name)) {
        const updatedPet = { name: name, kind: kind, age: age };
        const pets = read().filter(pet => pet.name != name);
        pets.push(updatedPet);
        fs.writeFileSync(petsFile, JSON.stringify(pets));
        return updatedPet;
    } else {
        return `No pet found by the name of \"${name}\"`;
    }
}

console.log(read());
// console.log(create('Duchess', 'bird', 2))

console.log(create('Duchess', 'bird', 2));
// console.log(create('Duchess', 'bird', 2))
console.log(create('Duchess', 'bird', 2));

console.log(remove('Snoopy'));
// // No pet found by the name of "Snoopy"

console.log(remove('Duchess'));
// // { name: 'Duchess', kind: 'bird', age: 2 }

console.log(read())
// // [ { name: 'Meowser', kind: 'cat', age: 3 } ]

console.log(update('Duchess', 'bird', 3))
// // No pet found by the name of "Duchess"

console.log(update('Meowser', 'cat', 4))
// // { name: 'Meowser', kind: 'cat', age: 4 }

console.log(read())
// // [ { name: 'Meowser', kind: 'cat', age: 4 } ]

console.log(update('Meowser', 'cat', 3))
// // { name: 'Meowser', kind: 'cat', age: 3 }