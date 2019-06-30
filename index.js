const fs = require('fs')

const contents = fs.readFileSync('./data/pets.json', 'utf-8');
const pets = JSON.parse(contents);

// Outputs the contents of pets. json 
function read()
{
    return pets;
}

// Append the passed in pet to the json file
function create(name, kind, age)
{
    // First check if the pet is already present in the array
    let index = 0;
    for (index = 0; index < pets.length; index++)
    {
        if (pets[index].name === name)
        { 
            return (name + ' is already is a pet');
        }
    }

    // If it is a new pet then add it to the array.
    pets.push({
        "name"  : name,
        "kind"  : kind,
        "age"   : age
    })

    // Stringify the data before writing back to the file
    petsAsString = JSON.stringify(pets);
    fs.writeFileSync('./data/pets.json', petsAsString);
    return pets;
}


// Check if the passed in pet is present in the json and if so then remove the 
// pet from the array
function remove(name)
{
    // Check if the pet that is passed to the array is in the array
    // Since there can only be one pet with a given name, we can iterate over
    // the array and break as soon as we find the pet
    let petPresent = false;
    let index = 0;
    for (index = 0; index < pets.length; index++)
    {
        if (pets[index].name === name)
        {
            petPresent = true;
            break;
        }
    }

    if (petPresent === true)
    {
        return pets.splice(index, 1);
    }
    else
    {
        return ('No pet found by the name ' + name);
    }
}

function update(name, kind, age)
{
    let index = 0;
    // First check if the pet that is passed in is presnt in the array.
    // If the pet is present then update the pet kind and age with the 
    // params that are passed in.
    for (index = 0; index < pets.length; index++)
    {
        if (pets[index].name === name)
        {
            pets[index].kind = kind;
            pets[index].age = age;
            
            return pets[index];
        }
    }

    // If pet is not found then return a string indicating the same
    return ('No pet found by the name ' + name);
}

// Run all the test cases here
console.log(read());

console.log(create('Duchess', 'bird', 2))

console.log(create('Duchess', 'bird', 2))

console.log(remove('Snoopy'))

console.log(remove('Duchess'))

console.log(read());

console.log(update('Duchess', 'bird', 3))

console.log(update('Meowser', 'cat', 4))

console.log(read());

console.log(update('Meowser', 'cat', 3))