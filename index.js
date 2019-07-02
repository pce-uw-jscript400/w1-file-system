
const fs = require('fs')

const read = () => {
  return(fs.readFileSync('./data/pets.json', 'utf-8'))
}

const create = (name, kind, age) => {
const contents = read()  
const pets = JSON.parse(contents)

  const newPet = {
    "name": name,
    "kind": kind,
    "age": age
  }
  
  for (i = 0; i < pets.length; i++) {
      if (name === pets[i].name) {
          return(`"${name}" is already a pet!`)
        }
    } 
    pets.push(newPet)
    petsString = JSON.stringify(pets, null, 4)
    fs.writeFileSync('./data/pets.json', petsString)
    console.log(pets)
}

const remove = (name) => {
    const contents = read() 
    const pets = JSON.parse(contents)

    for (i = 0; i < pets.length; i++) {
        if (name === pets[i].name) {
            pets.splice(i , 1)
            petsString = JSON.stringify(pets, null, 4)
            fs.writeFileSync('./data/pets.json', petsString)
            console.log(pets)
          }
      } 
    return(`No pet found by the name of "${name}"`)
}

const update = (name, kind, age) => {
  const contents = read()  
  const pets = JSON.parse(contents)

  for (i = 0; i < pets.length; i++) {
    if (name === pets[i].name) {
      pets[i].kind = kind;
      pets[i].age = age;
      return(pets[i])
    }
  }
  return(`No pet found by the name of "${name}"`)
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