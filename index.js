const fs = require('fs')
// read in the contents of the file
const contents = fs.readFileSync('./data/pets.json', 'utf-8')
// parsing the contents so that it is a javascript array
// (in contrast to JSON)
const pets = JSON.parse(contents)
// push in another pet
pets.push({ name: "Oliver", kind: "Cat", age: 2 })
// transform back into a string
const stringy = JSON.stringify(pets)
// write the entire array back to the file
fs.writeFileSync('./data/pets.json', stringy)