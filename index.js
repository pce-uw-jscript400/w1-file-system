const fs = require('fs')
const contents = fs.readFileSync('./data/pets.json', 'utf-8')
const pets = JSON.parse(contents)

const path = require('path')
const petsFile = path.join(__dirname, 'data', 'pets.json')

const read = () => {
  return(pets)
}

const create = (name, kind, age) => {
  const newPet = {
    "name": name,
    "kind": kind,
    "age": age
  }


  if ((pets.some(pet => pet.name === name))) {
    console.log(`${newPet.name} is already a pet!`)
  } else {
    pets.push(newPet)
    petsString = JSON.stringify(pets)
    fs.writeFileSync(petsFile, petsString)
    return(fs.readFileSync(petsFile, 'utf-8'))
  }
}

const remove = (name) => {
  const removePet = pets.find(pet => pet.name === name)
  if (removePet) {
    pets.splice(pets.findIndex(pet => pet.name === name), 1)

    petsString = JSON.stringify(pets)
    fs.writeFileSync(petsFile, petsString)
    console.log(removePet)
  } else {
    console.log(`No pet found by the name of ${name}`)
  }
}

const update = (name, kind, age) => {
  const updatePet = pets.find(pet => pet.name === name)

  if (updatePet) {
    let idx = pets.findIndex(pet => pet.name === name);

    pets[idx] = {
      name: name,
      kind: kind,
      age: age
    }

    petsString = JSON.stringify(pets)
    fs.writeFileSync(petsFile, petsString)
    console.log(read())
  } else {
    console.log(`No pet found by the name of ${name}`)
  }
}


//
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
