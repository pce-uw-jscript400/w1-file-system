console.log('Hello, Node!')
var fs = require('fs');

const read = () => {
    var pets = JSON.parse(fs.readFileSync('./data/pets.json', 'utf8'));
    return (
        pets
    )
};

const isPetInList = (petName, petList) => {

    petList = Array.from(petList);

    return petList.some(pet => {
        return pet.name === petName;
    });
}


const create = (name, kind, age) => {
    pets = read();
    newPet = {
        "name": name,
        "kind": kind,
        age: age
    };
    if (!(isPetInList(name, pets))) {
        pets.push(newPet);
        fs.writeFileSync('./data/pets.json', JSON.stringify(pets), 'utf8');
        return (JSON.stringify(newPet));
    } else {
        return (
            name + ' is already a pet'
        );
    }
};

const remove = (name) => {
    pets = read();
    if (isPetInList(name, pets)) {
        pets = pets.filter(pet => pet.name != name);
        fs.writeFileSync('./data/pets.json', JSON.stringify(pets), 'utf8');
        return (pets)

    } else {
        return ('No pet found by the name of ' + name);
    };
};

const update = (name, kind, age) => {
    pets = read();
    if (isPetInList(name, pets)) {
        remove(name);
        create(name, kind, age);
        return JSON.stringify(pets[pets.length - 1]);
    } else {
        return ('No pet found by the name of ' + name);
    }
};



console.log(update('Meowser', 'cat', 3))