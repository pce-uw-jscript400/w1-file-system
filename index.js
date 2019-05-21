const fs = require('fs')
const path = require('path')
const petsFile = path.join(__dirname, 'data', 'pets.json')

function read () {
  const content = fs.readFileSync(petsFile, 'utf-8')
  return JSON.parse(content)
}

function write (pets) {
  const content = JSON.stringify(pets)
  fs.writeFileSync(petsFile, content, 'utf-8')
}

function findByName (pets, name) {
  return pets.find(pet => pet.name.toLowerCase() === name.toLowerCase())
}

function create (name, kind, age) {
  const pets = read()
  const alreadyExists = findByName(pets, name)
  if (alreadyExists) return `"${name}" is already a pet!`

  pets.push({ name, kind, age })
  write(pets)

  return pets
}

function remove (name) {
  const pets = read()
  const pet = findByName(pets, name)
  if (!pet) return `No pet found by the name of "${name}"`

  const index = pets.indexOf(pet)
  pets.splice(index, 1)
  write(pets)

  return pet
}

function update (name, kind, age) {
  const pets = read()
  const pet = findByName(pets, name)
  if (!pet) return `No pet found by the name of "${name}"`

  const index = pets.indexOf(pet)
  const newPet = { name, kind, age }
  pets.splice(index, 1, newPet)
  write(pets)

  return newPet
}

console.log(read())
console.log(create('Duchess', 'bird', 2))
console.log(create('Duchess', 'bird', 2))
console.log(remove('Snoopy'))
console.log(remove('Duchess'))
console.log(read())
console.log(update('Duchess', 'bird', 3))
console.log(update('Meowser', 'cat', 4))
console.log(read())
console.log(update('Meowser', 'cat', 3))