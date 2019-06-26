// console.log('Hello, Node!')

const fs = require('fs')
const contents = fs.readFileSync('./data/pets.json', 'utf-8')
// const json = JSON.parse(contents)
const pets = JSON.parse(contents)

// console.log(typeof contents)

// console.log(json[0].name)

pets.push({ name: "Oliver", kind: "Cat", age: 2})

const stringyPets = JSON.stringify(pets)

fs.writeFileSync('./data/pets.json', stringyPets)

// read the file in first
// parse the json
// tack it onto the new index of the Array
// write back to the file