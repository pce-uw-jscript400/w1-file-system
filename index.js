console.log('Hello, Node!');

const fs = require('fs');

const contents = fs.readFileSync('./data/pets.sample.json', 'utf-8');
const pets = JSON.parse(contents);
console.log(pets);

// const contents2 = fs.readFile('./data/pet.ssample.json', 'utf-8', (err, data) => {
//     const pets2 = JSON.parse(data);
//     console.log(pets2);
// });

pets.push({ name: 'Oliver', kind: 'cat', age:2});
const stringy = JSON.stringify(pets);

fs.writeFileSync('./data/pets.sample.json', stringy);

// PAIR EXERCISE
function read(){
    const pets = fs.readFileSync('./data/pets.sample.json', 'utf-8');
    const p = JSON.parse(pets);
    return p;
}

console.log(read())

console.log('***********');
function create(name, kind, age){
    const pets = fs.readFileSync('./data/pets.sample.json', 'utf-8');
    const p = JSON.parse(pets);
    const temp = {name, kind, age};

    //index doesn't actually work here, try something else
    console.log(p.indexOf(temp));
    if(p.indexOf(temp) > 0){
        return temp.name + ' is already a pet!'
    }else{
        p.push(temp);
        return p;  
    }  
}

console.log(create('Duchess', 'bird', 2))

console.log(create('Duchess', 'bird', 2));