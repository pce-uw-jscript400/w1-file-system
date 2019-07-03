const fs = require('fs')
const path = require('path')
const petsFile = path.join(__dirname, 'data', 'pets.json')

/*
|Helper function to write data to file
|Input: An array of objects
|Output: nothing
*/
function write(db){
    const stringy = JSON.stringify(db, null, 4)
    fs.writeFileSync(petsFile, stringy)
}

//C: appends a new obj to the db and then returns the contents of the db

function create(name, kind, age){
    const db = read()
    if (db.find(pet => pet.name === name)) {
        return `"${name}" is already a pet!`
    } else {
        db.push({name: name, kind: kind, age: age})
        write(db)
        return db
    }
}

//R: reads contents of db
function read(){
    const contents = fs.readFileSync(petsFile, 'utf-8')
    return JSON.parse(contents)
}

//U: updates an item from the db and returns the updated item
function update(name, kind, age){
    const db = read()
    const index = db.findIndex(pet => pet.name === name)
    if (index === -1) {
        return `No pet found by the name of "${name}"`
    } else {
        const updatedPet = {name: name, kind: kind, age: age}
        //return spliceDb(db, index, updatedPet)
        db.splice(index, 1, updatedPet)
        write(db)
        return updatedPet
    }

}

//D: deletes an item from the db and returns the removed item
function remove(name){
    const db = read()
    const index = db.findIndex(pet => pet.name === name)
    if (index === -1) {
        return `No pet found by the name of "${name}"`
    } else {
        //return spliceDb(db, index)
        const removed = db.splice(index, 1)[0]
        write(db)
        return removed
    }
    
}


//TEST FUNCTIONS

console.log(read())
//[ { name: 'Meowser', kind: 'cat', age: 3 } ]

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