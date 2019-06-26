console.log('Hello, Node!');

const fs = require('fs');

const contents = fs.readFileSync('./data/pets.sample.json', 'utf-8');
const pets = JSON.parse(contents);
console.log(pets);

const contents2 = fs.readFile('./data/pet.ssample.json', 'utf-8', (err, data) => {
    const pets2 = JSON.parse(data);
    console.log(pets2);
});

pets.push({ name: 'Oliver', kind: 'cat', age:2});
const stringy = JSON.stringify(pets);

fs.writeFileSync('./data/pets.sample.json', stringy);