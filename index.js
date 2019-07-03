const fs = require('fs'); 
const path = require('path');
const petsJson = path.join(__dirname, 'data', 'pets.json') // Path to pets.json file


const read = () => {
    let petData = fs.readFileSync(petsJson, 'utf-8'); // set petData to contents of pets.json file read via fs readFileSync method
    let petsParsed = JSON.parse(petData); // JSON Parse the read pets.json file
    return petsParsed;
}

const checkforValue = name => {
    return read().some(petEntry => { // return true or false when checking array produced from parsed pets.json file, 
        return petEntry.name === name; // comparing the value for name property of petEntry to the name provided in checkforValue arguments
    });
}

const create = (name, kind, age) => { 
    const pet = {name, kind, age}; // create new object pet (to be added) using name, kind, age provided in create arguments
    const petArray = read(); // set new variable petArray to equal the array produced from parsed pets.json file
    if (checkforValue(pet.name)) { // if new pet name is found in petsParsed array
        return `\"${name}\" is already a pet!`; // inform pet already exists
    }
    else { // otherwise, assume pet is new
        petArray.push(pet); // add new object pet to existing array using push method
        const petsStringified = JSON.stringify(petArray);
        fs.writeFileSync(petsJson, petsStringified); // replace existing contents of pets.json file with stringified, updated petsArray
        return read(); // return updated pets.json file, parsed
    }
}

const remove = name => {
    const petArray = read(); // set new variable petArray to equal the array produced from parsed pets.json file
    if (checkforValue(name)) { // if pet name is found in petsParsed array
        const pet = Object.assign({}, petArray.filter(pet => pet.name === name)[0]); // create object for pet matching name, to be removed (Is this the best approach to this? Are there alternatives you can suggest?)
        const petsUpdated = petArray.filter(pet => pet.name != name); // create array of pets not matching name, to be retained
        const petsStringified = JSON.stringify(petsUpdated); // assign to petsStringified a stringified copy of the petsUpdated array
        fs.writeFileSync(petsJson, petsStringified); // update pets.json file using writeFileSync
        return pet;
    } 
    else {
        return `No pet found by the name of \"${name}\"`;
    }
}

const update = (name, kind, age) => {
    const pet = {name, kind, age}; // create new object pet (which will replace existing pet of same name) using name, kind, age provided in update arguments
    const petArray = read(); // set new variable petArray to equal the array produced from parsed pets.json file
    if (checkforValue(pet.name)) { // if pet name is found in petsParsed array
        const petsCopy = petArray.filter(pet => pet.name != name); // create new array petsCopy of pets which are not to be updated
        petsCopy.push(pet); // add new object for updated pet to existing array  of pets not updated using push method
        const petsStringified = JSON.stringify(petsCopy); // assign to petsStringified a stringified copy of the petsCopy array
        fs.writeFileSync(petsJson, petsStringified); // update pets.json file using writeFileSync
        return pet; 
    } else {
        return `No pet found by the name of \"${name}\"`;
    }
}

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