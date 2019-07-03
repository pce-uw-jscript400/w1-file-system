const fs = require('fs');

function read(){
    const reader = fs.readFileSync('./data/pets.json', 'utf8');
    return reader;
}

function create(petName, petType, petAge) {
    let isHere = false;
    pets = JSON.parse(read());
    for (let i = 0; i < pets.length; i++){
        if (pets[i].name == petName) {
            isHere = true;
            break;
        }
    }
    if (!isHere) {
        pets.push({name: petName, kind: petType, age: petAge })
        pets = JSON.stringify(pets)
        fs.writeFileSync('./data/pets.json', pets)
        return pets;
    }
    else return `"${petName}" is already a pet!`
}

function remove(petName) {
    let isHere = false;
    pets = JSON.parse(read());
    for (let i = 0; i < pets.length; i++){
        if (pets[i].name == petName) {
            isHere = true;
            petters = pets.splice(i, 1)
            petters = JSON.stringify(petters)
            pets = JSON.stringify(pets)
            fs.writeFileSync('./data/pets.json', pets)
            return petters;
        }
    }
    if (!isHere) {
        return `No pet found by the name of "${petName}"`
    }
}

function update(petName, petType, petAge) {
    let isHere = false;
    pets = JSON.parse(read());
    for (let i = 0; i < pets.length; i++){
        if (pets[i].name == petName) {
            isHere = true;
            pets[i].name = petName
            pets[i].kind = petType
            pets[i].age = petAge
            pets = JSON.stringify(pets)
            fs.writeFileSync('./data/pets.json', pets)
            return pets;
        }
    }   
    if (!isHere) {
        return `No pet found by the name of "${petName}"`
    }
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