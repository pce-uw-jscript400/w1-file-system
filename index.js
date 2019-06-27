const fs = require("fs");
const contents = fs.readFileSync("./data/pets.json", "utf-8");
const pets = JSON.parse(contents);

// Read contents
const read = pets => pets;
console.log("### This reads files ->", read(pets));

// Write to contents
const create = pet => {
  pets.push(pet);
  const upsertNewPet = JSON.stringify(pets);
  fs.writeFileSync("./data/pets.json", upsertNewPet);
};

// Please feel free to enter new pet values below
console.log(
  "### This creates a new pets record ->",
  create({ name: "Rosco", kind: "dog", age: 7 })
);
