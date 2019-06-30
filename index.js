const fs = require('fs');
const petsFile = fs.readFileSync('./data/pets.json', 'utf-8');
const pets = JSON.parse(petsFile);

function read() {
  return pets
}

function create(name, kind, age) {
  const newPet = {
    "name": name,
    "kind": kind,
    "age": age
  };
  if (pets.some(e => e.name === name)) {
    return `${name} is already a pet!`
  }
  pets.push(newPet);
  const newPets = JSON.stringify(pets);
  fs.writeFileSync('./data/pets.json', newPets);
  return newPets;
}

function remove(name) {
  let petToRemoveIndex;
  for (let i=0; i < pets.length; i++ ) {
    if (pets[i].name === name) {
      petToRemoveIndex = i;
      break;
    }
  }

  if (petToRemoveIndex >= 0) {
    return pets.splice(petToRemoveIndex)[0];
  } else {
    return `No pet found by the name of ${name}`
  }
}

function update(name, kind, age) {
  let petToUpdateIndex;
  for (let i=0; i < pets.length; i++ ) {
    if (pets[i].name === name) {
      petToUpdateIndex = i;
      break;
    }
  }
  if (petToUpdateIndex >= 0) {
    pets[petToUpdateIndex] = {
      name,
      kind,
      age
    }
    return pets[petToUpdateIndex];
  } else {
    return `No pet found by the name of ${name}`
  }
}