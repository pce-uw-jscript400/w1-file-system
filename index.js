// console.log("Hello, Node!");
// const path = require("path");
// const petsFile = path.join(__dirname, "data", "pets.json");
const fs = require("fs");

read = () => {
  const contents = fs.readFileSync("./data/pets.json", "utf-8");
  return contents;
};

create = (name, kind, age) => {
  const contents = fs.readFileSync("./data/pets.json", "utf-8");
  const pets = JSON.parse(contents);
  if (pets.filter(pet => pet.name === name).length > 0) {
    return `${name} is already a pet!`;
  }
  pets.push({ name: name, kind: kind, age: age });
  const stringy = JSON.stringify(pets);
  fs.writeFileSync("./data/pets.json", stringy);
  return pets;
};

update = (name, kind, age) => {
  const contents = fs.readFileSync("./data/pets.json", "utf-8");
  const pets = JSON.parse(contents);
  pets.forEach(pet => {
    if (pet.name === name) {
      pet.name = name;
      pet.kind = kind;
      pet.age = age;
    }
  });
  const stringy = JSON.stringify(pets);
  fs.writeFileSync("./data/pets.json", stringy);
  return pets;
};

remove = name => {
  const contents = fs.readFileSync("./data/pets.json", "utf-8");
  const pets = JSON.parse(contents);
  const index = pets.findIndex(pet => pet.name === name);
  if (index === -1) {
    return `No pet found by the name of ${name}`;
  } else {
    pets.splice(index, 1);
  }
  const stringy = JSON.stringify(pets);
  fs.writeFileSync("./data/pets.json", stringy);
  return pets;
};

//tests
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
