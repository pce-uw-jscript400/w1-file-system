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

//console.log(read())
// [ { name: 'Meowser', kind: 'cat', age: 3 } ]
function read(){
    const pets = fs.readFileSync('./data/pets.json', 'utf-8');
    const p = JSON.parse(pets);
    return p;
}

console.log('\nread');
console.log(read());

// console.log(create('Duchess', 'bird', 2))
// [
//   { name: 'Meowser', kind: 'cat', age: 3 },
//   { name: 'Duchess', kind: 'bird', age: 2 }
// ]
// console.log(create('Duchess', 'bird', 2))
// "Duchess" is already a pet!

function create(name, kind, age){
    const pets = fs.readFileSync('./data/pets.json', 'utf-8');
    const p = JSON.parse(pets);
    const temp = {name, kind, age};

    if(_.findWhere(p, temp)){
        return temp.name + ' is already a pet!'
    }else{
        p.push(temp);
        fs.writeFileSync('./data/pets.json', JSON.stringify(p));
        return p;  
    }  
}

console.log('\ncreate');
console.log(create('Duchess', 'bird', 2));

console.log('\ncreate');
console.log(create('Duchess', 'bird', 2));
