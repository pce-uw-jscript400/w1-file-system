const fs = require('fs')
const path = require('path')
const petsFile = path.join(__dirname, 'data', 'pets.json')

const read = function (){
  const contents = fs.readFileSync(petsFile, 'utf-8')
  return JSON.parse(contents)
}

const create = function (name, kind, age){
  const pets = read()
  if (pets.find(pet => {return pet.name === name})) {
    return `"${name}" is already a pet!`
  } else {
    pets.push({name: name, kind: kind, age: age})
    const stringy = JSON.stringify(pets)
    fs.writeFileSync(petsFile, stringy)
    return pets
  }
}

const update = function(name, kind, age){
  const pets = read()
  const index = pets.findIndex(pet => pet.name === name)
  if (index === -1) {
      return `No pet found by the name of "${name}"`
  } else {
      const updatedPet = {name: name, kind: kind, age: age}
      pets.splice(index, 1, updatedPet)
      const stringy = JSON.stringify(pets)
      fs.writeFileSync(petsFile, stringy)
      return updatedPet
  }
}

const remove = function(name){
  const pets = read()
  const index = pets.findIndex(pet => pet.name === name)
  if (index === -1) {
      return `No pet found by the name of "${name}"`
  } else {
      const removed = pets.splice(index, 1)[0]
      const stringy = JSON.stringify(pets)
      fs.writeFileSync(petsFile, stringy)
      return removed
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
