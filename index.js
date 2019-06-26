const fs = require('fs');
const contents = fs.readFileSync('./data/pets.json', 'utf-8');
const pets = JSON.parse(contents)

function isPetAlreadyInDB(newPetName) {
    const contents = fs.readFileSync('./data/pets.json', 'utf-8');
    const pets = JSON.parse(contents)

    return pets.some(function(pet) {
        return pet.name === newPetName;
    })
}

function read() {
    const contents = fs.readFileSync('./data/pets.json', 'utf-8');
    const pets = JSON.parse(contents);
    return pets;
}

function create(name, kind, age) {
    const contents = fs.readFileSync('./data/pets.json', 'utf-8');
    const pets = JSON.parse(contents);
    const newPet = { name: name, kind: kind, age: age};
    const doesPetExist = isPetAlreadyInDB(name);
    if (!doesPetExist) {
        pets.push(newPet);
        const stringPets = JSON.stringify(pets);
        fs.writeFileSync('./data/pets.json', stringPets);
        return read();
    } else {
        return `${name} is already a pet!`;
    }
}

function remove(name) {  
    //Tried to get async-await to work here, but could not figure out how, so the variables are here locally
    const contents = fs.readFileSync('./data/pets.json', 'utf-8');
    const pets = JSON.parse(contents);
    let removedPet = pets.filter(pet => pet.name === name);

    const doesPetExist = isPetAlreadyInDB(name);
    if (doesPetExist) {
        const updatedPets = pets.filter(pet => pet.name !== name)
        const stringRemovedPets = JSON.stringify(updatedPets);
        fs.writeFileSync('./data/pets.json', stringRemovedPets);
        return removedPet;
    } else {
        return `No pet found by the name of ${name}`
    }
}

function update(name, kind, age) {
    const updatedPet = {name: name, kind: kind, age: age};
    const doesPetExist = isPetAlreadyInDB(name);

    if(!doesPetExist) {
        return `No pet found by the name of ${name}`;
    } else {
        const filteredPetArr = pets.filter(pet => pet.name !== name);
        filteredPetArr.push(updatedPet);
        const stringifiedUpdatedPets = JSON.stringify(filteredPetArr);
        fs.writeFileSync('./data/pets.json', stringifiedUpdatedPets);
        return read();
    }
}


console.log('READ:',read())
// // [ { name: 'Meowser', kind: 'cat', age: 3 } ]

console.log('CREATE',create('Duchess', 'bird', 2))
// // [
// //   { name: 'Meowser', kind: 'cat', age: 3 },
// //   { name: 'Duchess', kind: 'bird', age: 2 }
// // ]

console.log('CREATE:', create('Duchess', 'bird', 2))
// // "Duchess" is already a pet!

console.log('REMOVE:',remove('Snoopy'))
// // No pet found by the name of "Snoopy"

console.log('REMOVE:', remove('Duchess'))
// // { name: 'Duchess', kind: 'bird', age: 2 }

console.log('READ:',read())
// // [ { name: 'Meowser', kind: 'cat', age: 3 } ]

console.log('UPDATE:',update('Duchess', 'bird', 3))
// // No pet found by the name of "Duchess"

console.log('UPDATE:',update('Meowser', 'cat', 4))
// // { name: 'Meowser', kind: 'cat', age: 4 }

console.log('READ:',read())
// // [ { name: 'Meowser', kind: 'cat', age: 4 } ]

console.log('UPDATE:',update('Meowser', 'cat', 3))
// // { name: 'Meowser', kind: 'cat', age: 3 }
