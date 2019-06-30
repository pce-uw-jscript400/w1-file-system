let data = './data/pets.json';
let fs = require ('fs');
let contents =  fs.readFileSync(data, 'utf-8');
let pets = JSON.parse(contents);

const path = require('path')
const petsFile = path.join(__dirname, 'data', 'pets.json')

// [ { name: 'Meowser', kind: 'cat', age: 3 } ]
let read = function(){
    return pets;
}
console.log(read());

let create = function(name, kind, age){
    let newPet = {name, kind, age};
    let anyMatch = false;
    for (let pet of pets) {
        if(pet.name === name){
            anyMatch = true;
            break;
        }
    }

    if(anyMatch){
        return  `"${name}" is already a pet!`;
    }else{
        pets.push(newPet);
        let stringy = JSON.stringify(pets);
        fs.writeFileSync(data, stringy);
        return pets;
    }
}

let remove = function(name){
    let anyMatch = false;
    for (let pet of pets) {
        if(pet.name === name){
            anyMatch = true;
            pets.splice(pets.indexOf(pet), 1);
            let stringy = JSON.stringify(pets);
            fs.writeFileSync(data, stringy);
            return pet;
        }
    }
    if(!anyMatch){
        return  `No pet found with the name of "${name}"`;
    }
}

let update = function(name, kind, age){
    let updatePet = {name, kind, age};
    let anyMatch = false;
    for (let pet of pets) {
        if(pet.name === name){
            anyMatch = true;
            pet.kind = kind;
            pet.age = age;
            let stringy = JSON.stringify(pets);
            fs.writeFileSync(data, stringy);
            return pet;
            break;
        }
    }
    if(!anyMatch){
        return  `No pet found with the name of "${name}"`;
    }
}

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
