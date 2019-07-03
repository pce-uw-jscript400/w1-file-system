var fs = require('fs');

//Make sure the file is present and writeable.
var file = './data/src/pets.json'
  fs.access(file, fs.constants.W_OK, (err) => {
  console.log(`${file} ${err ? 'is not writable' : 'is writable'}`);
});

//Read-in file and return output.
function read() {
  var output = fs.readFileSync(file, 'utf8' );
  return output;
}

//Create if it does not exist.
function create(name, kind, age) {
  var contents = read();
  const pets = JSON.parse(contents);

  var obj = {};
  obj['name'] = name;
  obj['kind'] = kind;
  obj['age'] = age;
  
  if (includes(name) == '-1' ) {
    pets.push(obj);
    const stringy = JSON.stringify(pets);
    fs.writeFileSync(file, stringy, 'utf8'); 
  } else {
    console.log(name + ' is already a pet')
  }
  return obj;
}

//Function to test if array includes a value.
function includes(name) {
  var contents = fs.readFileSync(file, 'utf8' );
  const pets = JSON.parse(contents);
  
  var index = pets.findIndex(n => n.name == name)
  return index;
}

//Remove object if exists, even more than once.
function remove(petName) {

  var contents = read();
  const pets = JSON.parse(contents);
  var found = false;

  // iterate all each elements in the array
  for (var i = 0; i < pets.length; i++){

    if (pets[i].name == petName){
      found = true;
      pets.splice(i, 1);
      const stringy = JSON.stringify(pets);
      fs.writeFileSync(file, stringy, 'utf8');
    }     
  }
  if (found == false){
    console.log('No pet found by the name of ' + petName )
  }
  return pets[i];
}

function update(name, kind, age) {

  var contents = read();
  const pets = JSON.parse(contents);
  var found = false;

  // iterate over each element in the array
  for (var i = 0; i < pets.length; i++){

    if (pets[i].name == name){

      pets[i].name = name;
      pets[i].kind = kind;
      pets[i].age = age;

      const stringy = JSON.stringify(pets);
      fs.writeFileSync(file, stringy, 'utf8');
    }     
  }
  return pets[i];
}

console.log(read())
// [ { name: 'Meowser', kind: 'cat', age: 3 } ]

console.log(create('Duchess', 'bird', 2))
// [
//   { name: 'Meowser', kind: 'cat', age: 3 },
//   { name: 'Duchess', kind: 'bird', age: 2 }
// ]

console.log(create('Duchess', 'bird', 2))
// "Duchess" is already a pet!

console.log(remove('Snoopy'))
// No pet found by the name of "Snoopy"

console.log(remove('Duchess'))
// { name: 'Duchess', kind: 'bird', age: 2 }

console.log(read())
// [ { name: 'Meowser', kind: 'cat', age: 3 } ]

console.log(update('Duchess', 'bird', 3))
// No pet found by the name of "Duchess"

console.log(update('Meowser', 'cat', 4))
// { name: 'Meowser', kind: 'cat', age: 4 }

console.log(read())
// [ { name: 'Meowser', kind: 'cat', age: 4 } ]

console.log(update('Meowser', 'cat', 3))
// { name: 'Meowser', kind: 'cat', age: 3 }
