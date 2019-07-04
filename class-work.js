console.log('Hello, Node!')

const fs = require('fs')
//require('./data/pets.json')
//calls the file system 
const contents = fs.readFileSync('./data/pets.json', 'utf-8')
//calling read file sync on the json, must pass encoding
const json = JSON.parse(contents)
//turns the contents from a giant string into an object

console.log(json[0].name)

//fs.writeFileSync('./data/pets.json', 'a thing')

console.log(json)

const pets = JSON.parse(contents)

pets.push({name: "Oliver", kind: "Cat", age: 2})

const stringy = JSON.stringify(pets)

//fs.writeFileSync('./data/pets.json', stringy)

