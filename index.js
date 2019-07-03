console.log('Hello, Node!')

const path = require('path')
const petsFile = path.join(__dirname, 'data', 'pets.json')

const fs = require('fs')

const read = () => {
    const file = JSON.parse(fs.readFileSync(petsFile, 'UTF-8'))
    return file;
}

const create = (name, kind, age) => {
    const pets = read();
    const newPet = { name, kind, age }
    if(pets.filter(p => p.name === name).length > 0)
    {
        return `\"${name}\" is already a pet`;
    } else {
        pets.push(newPet);
        fs.writeFileSync(petsFile, JSON.stringify(pets));
        return read();
    }
}

const remove = (name) => {
    const pets = read();
    const pos = pets.map(p => p.name).indexOf(name);
    if(pos < 0) {
        return `No pet found by the name of \"${name}\"`;
    } else {
        const removedPet = pets[pos];
        pets.splice(pos,1);
        fs.writeFileSync(petsFile, JSON.stringify(pets));
        return removedPet;
    }
}

const update = (name, kind, age) => {
    const pets = read();
    const pos = pets.map(p => p.name).indexOf(name);
    if(pos < 0) {
        return `No pet found by the name of \"${name}\"`;
    } else {
        const updatedPet = pets[pos];
        updatedPet.kind = kind;
        updatedPet.age = age;
        fs.writeFileSync(petsFile, JSON.stringify(pets));
        return updatedPet;
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