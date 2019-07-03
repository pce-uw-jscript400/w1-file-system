//Globals
//call fs library
const fs = require("fs");
//pull in pets json
const pets = "./data/pets.json";
//read and encode the json
const readPets = fs.readFileSync(pets, "utf-8");
//turn it into an object
const parsePets = JSON.parse(readPets);

//Read
const read = function() {
  return readPets;
};

//Create
const create = function(theName, theKind, theAge) {
  let lookForRepeats = false;
  parsePets.map(pet => {
    if (theName === pet.name) {
      lookForRepeats = true;
    }
  });

  if (lookForRepeats === true) {
    return `${theName} is already a pet`;
  }

  parsePets.push({ name: theName, kind: theKind, age: theAge });
  return parsePets;
};

//Remove
const remove = function(theName) {
  let msg = "";
  parsePets.map((pet, idx) => {
      if (theName === pet.name) {
        parsePets.splice(idx, 1);
        msg = pet
    } else {
      msg = `No pet found by the name of ${theName}`;
    }
  });
  return msg;
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

console.log(read())
// [ { name: 'Meowser', kind: 'cat', age: 3 } ]

//console.log(update('Duchess', 'bird', 3))
// No pet found by the name of "Duchess"

//console.log(update('Meowser', 'cat', 4))
// { name: 'Meowser', kind: 'cat', age: 4 }

//console.log(read())
// [ { name: 'Meowser', kind: 'cat', age: 4 } ]

//console.log(update('Meowser', 'cat', 3))
// { name: 'Meowser', kind: 'cat', age: 3 }
