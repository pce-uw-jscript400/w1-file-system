const fs = require('fs');
const contents = fs.readFileSync('./data/pets.json', 'utf-8')
const pets = JSON.parse(contents)


const path = require('path')
const petsFile = path.join(__dirname, 'data', 'pets.json')

console.log(petsFile)

function read(){
    return pets
}

function create(name, kind, age){
    const newPet = { name: name, kind: kind, age: age};

    let check = pets.some(item => item.name === newPet.name)

    if (check == true){
        return `${newPet.name} is already a pet!`
    }else{
        pets.push(newPet);
        const stringy = JSON.stringify(pets);
        fs.writeFileSync('./data/pets.json', stringy)
        return pets
    }
}

function remove(name, kind, age){
    const removePet = { name: name, kind: kind, age: age};

    let check = pets.some(item => item.name === removePet.name);

    let petIndex = pets.findIndex(pets => pets.name === removePet.name);

    if (check == false){
        return `No pet found by the name ${removePet.name}`
    }else{
        pets.splice(petIndex);
        const stringy = JSON.stringify(pets);
        fs.writeFileSync('./data/pets.json', stringy)        
        return pets
    }
}

function update(name, kind, age){
    const updatePet = { name: name, kind: kind, age: age};

    let check = pets.some(item => item.name === updatePet.name);

    let petIndex = pets.findIndex(pets => pets.name === updatePet.name);

    if (check == false){
        return `No pet found by the name ${updatePet.name}`
    }else{
        pets.splice(petIndex, 1, updatePet);
        const stringy = JSON.stringify(pets);
        fs.writeFileSync('./data/pets.json', stringy)
        return pets
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
