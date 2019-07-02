const fs = require("fs");
const path = require("path");
const petsFile = path.join(__dirname, "data", "pets.json");
const contents = fs.readFileSync(petsFile, "utf-8");
const pets = JSON.parse(contents);

// Utility pet checker
const runPetSearch = name => {
  let isPetRecord = pets.some(record => record.name === name);
  // This console.log is for testing only
  console.log(`Does pet ${name} exist?`, isPetRecord);
  return isPetRecord;
};

// Read contents
const read = () => {
  return pets;
};

// Write to contents
const create = (name, kind, age) => {
  const newPetRecord = {
    name,
    kind,
    age
  };

  if (!runPetSearch(name)) {
    pets.push(newPetRecord);
    const petString = JSON.stringify(pets);
    fs.writeFileSync(petsFile, petString);
    return read();
  }
  return `${name} is already a pet!`;
};

const remove = () => {};

// Remove from contents
const remove = name => {
  const contents = fs.readFileSync(petsFile, "utf-8");
  const pets = JSON.parse(contents);
  let removePet = pets.filter(pet => pet.name === name);

  if (checkForPet(name)) {
    const updatedPetList = pets.filter(pet => pet.name !== name);
    const removedPetString = JSON.stringify(updatedPetList);
    fs.writeFileSync(petsFile, removedPetString);
    return removePet;
  }
  return `We were not able to remove the name ${name} from our list of pets. Please try again.`;
};

console.log(read());
// [ { name: 'Meowser', kind: 'cat', age: 3 } ]

console.log(create("Duchess", "bird", 2));
// [
//   { name: 'Meowser', kind: 'cat', age: 3 },
//   { name: 'Duchess', kind: 'bird', age: 2 }
// ]

console.log(create("Duchess", "bird", 2));
// "Duchess" is already a pet!

// console.log(remove("Snoopy"));
// // No pet found by the name of "Snoopy"

// console.log(remove("Duchess"));
// // { name: 'Duchess', kind: 'bird', age: 2 }

// console.log(read());
// // [ { name: 'Meowser', kind: 'cat', age: 3 } ]

// console.log(update("Duchess", "bird", 3));
// // No pet found by the name of "Duchess"

// console.log(update("Meowser", "cat", 4));
// // { name: 'Meowser', kind: 'cat', age: 4 }

// console.log(read());
// // [ { name: 'Meowser', kind: 'cat', age: 4 } ]

// console.log(update("Meowser", "cat", 3));
// // { name: 'Meowser', kind: 'cat', age: 3 }
