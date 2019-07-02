//console.log('Hello, Node!')

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
