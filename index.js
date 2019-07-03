const fs = require('fs');
const content = fs.readFileSync('./data/pets.json', 'utf-8')
const pets = JSON.parse(content)


const read = () => {
    return (pets);
}

const create = (name, kind, age) => {
    
    for(i = 0; i < pets.length; i++) {
        if (pets[i].name == name) {
            console.log(`${name} is already a pet!`);
            return;
        } 
    }

    pets.push({name: name, kind: kind, age: age})
    const stringy = JSON.stringify(pets)
    fs.writeFileSync('./data/pets.json', stringy )
    return (pets);
}

const remove = (name) => {

    for(i = 0; i < pets.length; i++) {
        if (pets[i].name == name) {
            pets.splice(i, 1);
            const stringy = JSON.stringify(pets)
            fs.writeFileSync('./data/pets.json', stringy )
            return (pets);
        } 
    }

    console.log(`No pet found by the name of ${name}`);
}

const update = (name, kind, age) => {
    
    for(i = 0; i < pets.length; i++) {
        if (pets[i].name == name) {
            pets.splice(i, 1);

            pets.push({name: name, kind: kind, age: age})
            const stringy = JSON.stringify(pets)
            fs.writeFileSync('./data/pets.json', stringy )
            return (pets);
        } 
    }

    console.log(`No pet found by the name of ${name}`);
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
// // [ { name: 'Meowser', kind: 'cat', age: 3 } ]

console.log(update('Duchess', 'bird', 3))
// No pet found by the name of "Duchess"

console.log(update('Meowser', 'cat', 4))
// { name: 'Meowser', kind: 'cat', age: 4 }

console.log(read())
// [ { name: 'Meowser', kind: 'cat', age: 4 } ]

console.log(update('Meowser', 'cat', 3))
// { name: 'Meowser', kind: 'cat', age: 3 }
