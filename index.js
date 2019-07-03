//console.log('Hello, Node!')
/***************************************************************
const path = require("path");
const petsFile = path.join(__dirname, "data", "pets.json");

console.log(petsFile);
const fs = require("fs");
let json;
const contents = fs.readFileSync("./data/pets.json", "utf-8");
json = JSON.parse(contents);
let pet = {
  name: "Duchess",
  kind: "bird",
  age: 2
};
console.log(pet);
json.push(pet);
let stringy = JSON.stringify(json);
fs.writeFileSync("./data/pets.json", stringy);
/************************************************************** */
const path = require("path");
const fs = require("fs");

read = () => {
  const contents = fs.readFileSync("./data/pets.json", "utf-8");
  return contents;
};
/************************************************************** */
create = (myName, myKind, myAge) => {
  let exist = false;

  const contents = read();

  json = JSON.parse(contents);
  let pet = {
    name: myName,
    kind: myKind,
    age: myAge
  };

  json.forEach(x => {
    if (x.name === myName && x.kind === myKind && x.age == myAge) {
      exist = true;
    }
  });
  if (exist) {
    return `${myName} is already a pet!`;
  } else {
    json.push(pet);
    let stringy = JSON.stringify(json);
    fs.writeFileSync("./data/pets.json", stringy);
    return read();
  }
};
/******************************************************* */
remove = deleteIt => {
  let exist = false;
  let j;
  const contents = read();

  json = JSON.parse(contents);

  for (let i = 0; i < json.length; i++) {
    if (json[i].name === deleteIt) {
      j = JSON.stringify(json.splice(i, 1));
      exist = true;
    }
  }

  if (!exist) {
    return `No pet found by the name of ${deleteIt}`;
  } else {
    let stringy = JSON.stringify(json);
    fs.writeFileSync("./data/pets.json", stringy);
    return console.log(j);
  }
};
/************************************************************ */
update = (nameUpdate, kindUpdate, ageUpdate) => {
  let exist = false;
  let j;
  const contents = read();

  json = JSON.parse(contents);

  for (let i = 0; i < json.length; i++) {
    if (json[i].name === nameUpdate) {
      // j = JSON.stringify(json.splice(i, 1));
      json[i].name = nameUpdate;
      json[i].kind = kindUpdate;
      json[i].age = ageUpdate;
      j = JSON.stringify(json);
      exist = true;
    }
  }

  if (!exist) {
    return `No pet found by the name of ${nameUpdate}`;
  } else {
    let stringy = JSON.stringify(json);
    fs.writeFileSync("./data/pets.json", stringy);
    return console.log(j);
  }
};

console.log(read());
console.log(create("Duchess", "bird", "2"));
console.log(remove("Snoopy"));
console.log(remove("Duchess"));
console.log(read());
console.log(update("Duchess", "bird", 3));
console.log(update("Meowser", "cat", 4));
console.log(update("Meowser", "cat", 3));
