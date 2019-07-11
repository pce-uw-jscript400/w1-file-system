var fs = require('fs');

function read() {
    let file = fs.readFileSync('./data/pets.json',"utf8");
    return file;
}

function create(name, kind, age) {
    let input = read();
    input = JSON.parse(input);

    if(getNameKey(name, input) != -1) {
        console.log(name, "is already a pet!");
    }
    else {
        input.push({ 'name':name, 'kind':kind, 'age':age });
        input = JSON.stringify(input);
        console.log(input);
        fs.writeFileSync('./data/pets.json', input);
    }
}

function remove(name) {
    let input = read();
    input = JSON.parse(input);
    let key = getNameKey(name, input);

    if(key == -1) {
        console.log("No pet found by the name of",name+".");
    }
    else {
        console.log(input[key]);
        input = input.splice(key-1,1);
        input = JSON.stringify(input);
        fs.writeFileSync('./data/pets.json', input);
    }
}

function update(name,kind,age) {
    let input = read();
    input = JSON.parse(input);
    let key = getNameKey(name,input);

    if(key == -1) {
        console.log("No pet found by the name of",name);
    }
    else {
        input[key]['name'] = name;
        input[key]['kind'] = kind;
        input[key]['age'] = age;
        console.log(input[key]);
        input = JSON.stringify(input);
        fs.writeFileSync('./data/pets.json', input);
    }
}

function getNameKey(name, input) {
    for(let i=0; i<input.length; i++) {
        if(input[i]['name'] == name) {
            return i;
        }
    }

    return -1;
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
