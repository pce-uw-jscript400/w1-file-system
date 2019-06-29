const fs = require("fs");
const path = require("path");
const petsFile = path.join(__dirname, "data", "pets.json");
// const contents = fs.readFileSync(petsFile, "utf-8");
// const pets = JSON.parse(contents);

// Read contents
const read = () => {
  const contents = fs.readFileSync(petsFile, "utf-8");
  const pets = JSON.parse(contents);
  return pets;
};

// Write to contents
const create = (name, kind, age) => {
  const contents = fs.readFileSync(petsFile, "utf-8");
  const pets = JSON.parse(contents);
  const newPet = {
    name,
    kind,
    age
  };
  pets.push(newPet);
  const petString = JSON.stringify(pets);
  fs.writeFileSync(petsFile, petString);
  return read();
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

console.log(remove("Snoopy"));
// No pet found by the name of "Snoopy"

console.log(remove("Duchess"));
// { name: 'Duchess', kind: 'bird', age: 2 }

console.log(read());
// [ { name: 'Meowser', kind: 'cat', age: 3 } ]

console.log(update("Duchess", "bird", 3));
// No pet found by the name of "Duchess"

console.log(update("Meowser", "cat", 4));
// { name: 'Meowser', kind: 'cat', age: 4 }

console.log(read());
// [ { name: 'Meowser', kind: 'cat', age: 4 } ]

console.log(update("Meowser", "cat", 3));
// { name: 'Meowser', kind: 'cat', age: 3 }
