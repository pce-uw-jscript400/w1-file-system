const fs = require('fs')
const path = require('path')
const petsFile = path.join(__dirname, 'data', 'pets.json')

const read = function (){
  const contents = fs.readFileSync(petsFile, 'utf-8')
  return JSON.parse(contents)
}

const create = function (name, kind, age){
  // read in the contents of the file
  const contents = fs.readFileSync(petsFile, 'utf-8')
  // parse contents so it's a JS array (we could just call our read function)
  const pets = JSON.parse(contents)

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

  if (  pets.find(pet => {
    pet.name === name
  } ) == -1 ) {
    // push in another pet
    pets.push({name: name, kind: kind, age: age})
    // transform back into a string
    const stringy = JSON.stringify(pets)
    // write entire array to file
    fs.writeFileSync(petsFile, stringy)
    return pets
  } else {
    console.log(`${name} is already a pet!`)
  }
}

const update = function(){

}

const remove = function(){
  
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

// console.log(remove('Snoopy'))
// No pet found by the name of "Snoopy"

// console.log(remove('Duchess'))
// { name: 'Duchess', kind: 'bird', age: 2 }

// console.log(read())
// [ { name: 'Meowser', kind: 'cat', age: 3 } ]

// console.log(update('Duchess', 'bird', 3))
// No pet found by the name of "Duchess"

// console.log(update('Meowser', 'cat', 4))
// { name: 'Meowser', kind: 'cat', age: 4 }

// console.log(read())
// [ { name: 'Meowser', kind: 'cat', age: 4 } ]

// console.log(update('Meowser', 'cat', 3))
// { name: 'Meowser', kind: 'cat', age: 3 }








// const fs = require('fs')
// // read in the contents of the file
// const contents = fs.readFileSync('./data/pets.json', 'utf-8')
// // parse contents so it's a JS array
// const pets = JSON.parse(contents)
// // push in another pet
// pets.push({name: "Oliver", kind: "Cat", age: 2})
// // transform back into a string
// const stringy = JSON.stringify(pets)
// // write entire array to file
// fs.writeFileSync('/data/pets.json', stringy)




// console.log('Hello, Node!')

// const fs = require('fs')
// const contents = fs.readFileSync('data/pets.json')

// const json = JSON.parse(contents)
// console.log(json)
// output:
// [ { name: 'Meowser', kind: 'cat', age: 3 } ]

// console.log(json[0].name)
// output:
// Meowser

// const contents = fs.readFileSync('package.json', 'utf-8')
// const json = JSON.parse(contents)
// console.log(json)


// const contents = fs.readFile('./package.json', 'utf-8', (err, data) => {
//   const json = JSON.parse(contents)
//   console.log(json)
// })


// console.log(contents)

// console.log(typeof contents) // object


// console.log(typeof contents) // object
