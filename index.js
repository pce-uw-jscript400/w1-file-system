var _ = require('underscore');

console.log('Hello, Node!');

const fs = require('fs');

// const contents = fs.readFileSync('./data/pets.sample.json', 'utf-8');
// const pets = JSON.parse(contents);
// console.log(pets);

// async read
// const contents2 = fs.readFile('./data/pet.sample.json', 'utf-8', (err, data) => {
//     const pets2 = JSON.parse(data);
//     console.log(pets2);
// });

function read(){
    const pets = fs.readFileSync('./data/pets.json', 'utf-8');
    const p = JSON.parse(pets);
    return p;
}

console.log('\nread');
console.log(read());
// [ { name: 'Meowser', kind: 'cat', age: 3 } ]

function create(name, kind, age){
    const pets = fs.readFileSync('./data/pets.json', 'utf-8');
    const p = JSON.parse(pets);
    const temp = {name, kind, age};

    if(_.findWhere(p, temp)){
        return `"${temp.name}" is already a pet!`
    }else{
        p.push(temp);
        fs.writeFileSync('./data/pets.json', JSON.stringify(p));
        return p;  
    }  
}

console.log('\ncreate');
console.log(create('Duchess', 'bird', 2));
// [
//   { name: 'Meowser', kind: 'cat', age: 3 },
//   { name: 'Duchess', kind: 'bird', age: 2 }
// ]

console.log('\ncreate');
console.log(create('Duchess', 'bird', 2));
// "Duchess" is already a pet!

function remove(name){
    const pets = fs.readFileSync('./data/pets.json', 'utf-8');
    let p = JSON.parse(pets);

    const toRemove = p.find(pet => pet.name === name);
    if(toRemove){
        p = p.filter(function(pet, index, arr){
            return pet.name !== name;
        });
        fs.writeFileSync('./data/pets.json', JSON.stringify(p));
        return toRemove;
    }else{
        return `No pet found by the name of "${name}"`
    }  
}

console.log('\nremove');
console.log(remove('Snoopy'));
// No pet found by the name of "Snoopy"

console.log('\nremove');
console.log(remove('Duchess'));
// { name: 'Duchess', kind: 'bird', age: 2 }

console.log('\nread');
console.log(read());
// [ { name: 'Meowser', kind: 'cat', age: 3 } ]

function update(name, kind, age){
    const pets = fs.readFileSync('./data/pets.json', 'utf-8');
    const p = JSON.parse(pets);
    const temp = {name, kind, age};
    const existingItem = p.findIndex(pet => pet.name === temp.name);

    if(existingItem > -1){
        p[existingItem] = temp;
        fs.writeFileSync('./data/pets.json', JSON.stringify(p));
        return temp;  
    }else{
        return `No pet found by the name of "${temp.name}"`
    }  
}

console.log('\nupdate');
console.log(update('Duchess', 'bird', 3))
// No pet found by the name of "Duchess"

console.log('\nupdate');
console.log(update('Meowser', 'cat', 4))
// { name: 'Meowser', kind: 'cat', age: 4 }

console.log('\nread');
console.log(read())
// [ { name: 'Meowser', kind: 'cat', age: 4 } ]

console.log('\nupdate');
console.log(update('Meowser', 'cat', 3))
// { name: 'Meowser', kind: 'cat', age: 3 }

module.exports = {create, read, update, remove}