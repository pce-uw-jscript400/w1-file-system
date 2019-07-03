

const fs  = require('fs');
const path = require('path')

const petsFile = path.join(__dirname, 'data', 'pets.json');
const newPets = path.join(__dirname, 'data', 'newpets.json');
const duchess = { name: 'Duchess', kind: 'bird', age: 2};
const newDuchess = { name: 'Duchess', kind: 'bird', age: 2};
const meowser = {name:"Meowser",kind:"cat",age:3}
const newMeowser = {name:"Meowser",kind:"bird",age:5}


const read = (f) => {
    const pets = fs.readFileSync(f);
    try{
        return JSON.parse(pets);
    }
    catch{
        return [];
    }
}


const create = (f,pet) => {
    let pets = read(f);
    
    if ( pets.map(function (x) { return x.name; }).indexOf(pet.name) >= 0){
        console.log(`${pet.name} already exists!`)
        return;
    }
    else{
        pets.push(pet);
        fs.writeFile(f,JSON.stringify(pets),'utf-8', (err)=>{
            if (!err){
                console.log(pets);
            }
            else{
                console.log(err)
            }
        });
    }
}



const remove= (f,pet) =>{

    let pets = read(f);
    var petIdx = pets.map(function (x) { return x.name; }).indexOf(pet.name);
    if (petIdx< 0 ){
        console.log(`There is no pet by the name of ${pet.name}`)
        return;
    }
    else{
        pets.splice(petIdx);
        fs.writeFile(f,JSON.stringify(pets),'utf-8', (err)=>{
            if (!err){
                console.log(pets);
            }
            else{
                console.log(err)
            }
        });
    }
}




const update= (f,pet) =>{

    let pets = read(f);
    var petIdx = pets.map(function (x) { return x.name; }).indexOf(pet.name);
    if (petIdx< 0 ){
        console.log(`There is no pet by the name of ${pet.name}`)
        return;
    }
    else{
        pets.splice(petIdx,1,pet)
        fs.writeFile(f,JSON.stringify(pets),'utf-8', (err)=>{
            if (!err){
                console.log(pets);
            
            }
            else{
                console.log(err)
            }
        });
    }
}

console.log(read(petsFile));

console.log(create(petsFile,duchess));

console.log(create(petsFile,duchess));

console.log(remove(petsFile,{name:'Snoopy',kind:'dog',age: 73}));

console.log(remove(petsFile,duchess));

console.log(read(petsFile));

console.log(update(petsFile,newDuchess));

console.log(update(petsFile,newMeowser));
