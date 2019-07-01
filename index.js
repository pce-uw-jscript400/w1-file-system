// console.log('Hello, Node!')
const fs = require('fs')
const contents = fs.readFileSync('./data/pets.json', 'utf-8')
const pets = JSON.parse(contents)

//read content of json file
function read() { 
    return pets
}
console.log(read())
//[ { name: 'Meowser', kind: 'cat', age: 3 } ]

//create a pet
function create(name, kind, age){
    const newPet = { name: name, kind: kind, age: age};
    let checkPets = pets.some(item => item.name === newPet.name)
    if (checkPets == true) {
        return `${name} is already a pet!`
    }else{
        pets.push(newPet); //add pet to the array
        const newPets = JSON.stringify(pets); 
        fs.writeFileSync('./data/pets.json', newPets);
    return newPets;
    }
}
console.log(create('Duchess', 'bird', 2))
//[{"name":"Meowser","kind":"cat","age":3},{"name":"Duchess","kind":"bird","age":2}]

//remove a pet
function remove(name, kind, age){
    const removePet = { name: name, kind: kind, age: age};
    let checkPets = pets.some(item => item.name === removePet.name)
    if (checkPets == true) {
        pets.splice(pets.findIndex(pet => pet.name === removePet.name), 1)
        const stringy = JSON.stringify(pets);
        fs.writeFileSync('./data/pets.json', stringy)   
        return pets           
    }else{
        return `No pet found by the name ${removePet.name}`
    }
}
console.log(remove('Snoopy'))
//No pet found by the name Snoopy
//Duchess is already a pet!

console.log(remove('Duchess'))
console.log(read())
//[ { name: 'Meowser', kind: 'cat', age: 3 } ]

//update a pet
function update(name, kind, age){
    const updatePet = { name: name, kind: kind, age: age};
    let checkPets = pets.some(item => item.name === updatePet.name)
    if (checkPets == true) {
        pets.splice(pets.findIndex(pet => pet.name === updatePet.name), 1, updatePet) 
        //find the index of the pet and update with new details
        const stringy = JSON.stringify(pets);
        fs.writeFileSync('./data/pets.json', stringy) 
        return pets             
    }else{
        return `No pet found by the name ${updatePet.name}`
    }
}
console.log(update('Duchess', 'bird', 3))
//No pet found by the name Duchess

console.log(update('Meowser', 'cat', 4))
//[ { name: 'Meowser', kind: 'cat', age: 4 } ]

console.log(read())
//[ { name: 'Meowser', kind: 'cat', age: 4 } ]

console.log(update('Meowser', 'cat', 3))
//[ { name: 'Meowser', kind: 'cat', age: 3 } ]