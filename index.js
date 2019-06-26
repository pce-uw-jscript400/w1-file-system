const fs = require('fs')
let pets = fs.readFileSync('./data/pets.json', 'utf-8')

// read contents
const read = (pets) => JSON.parse(pets)
console.log(read(pets))

// write to contents
// pets.push({ name: "Duchess", kind: "Bird", age: 2})
// const stringyPets = JSON.stringify(pets)
// fs.writeFileSync('./data/pets.json', stringyPets)

//----- testing -------------//

// write to contents
const create = (pet) => {
    // pets.push(pet)
    const stringifyPets = JSON.stringify(pet)
    fs.writeFileSync('./data/pets.json', stringifyPets)
}
console.log(create('Rosco', 'dog', 7))









// remove from contents
// const filteredPets = pets.filter(pet => pet === 'Duchess')
// console.log(filteredPets)