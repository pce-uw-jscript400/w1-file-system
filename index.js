const fs = require('fs')
const path = require('path')

const petsFile = path.join(__dirname, 'data', 'pets.json')
console.log(petsFile)

/* READ function */
const read = () => {
  //Reads the contents of the file and converts it into utf-8 format
  const contents = fs.readFileSync('./data/pets.json', 'utf-8')
  //Returns the content of the file which is already a string. This will make it so that we can console log the contents of the file.
  return contents;
}//End of the READ function





//CREATE function
const create = (name, kind, age) => {
  //Reads the contents of the file and converts it into utf-8 format
  const contents = fs.readFileSync('./data/pets.json', 'utf-8')

  //Parse the string content of the file into real JSON that I can work with
  const jsonparse = JSON.parse(contents)

  /* This is a function to check if a certain named pet already exists in the array.
  The function returns true if the pet exists and false if the pet doesn't exist.
  This test will be used later. */

  const checkifpetexists = jsonparse.some((item) => {
      //This checks if all 3 properties are the same, not just the name of the pet.
      if(item.name === name && item.kind === kind && item.age === age){

        return true;
      }
      return false;
  })

  //Checks to see if pet doesn't yet exist
  if(!checkifpetexists){

      //Pushes a new object into the end of the array. Values for name, kind and age are whats being passed into the function.
      jsonparse.push({name: name, kind: kind, age: age})

      //Make json into a string again so that I can write it back to the file
      const stringy = JSON.stringify(jsonparse)

      //Replace the contents of the pets file with the newly stringified json string
      fs.writeFileSync('./data/pets.json', stringy)


  }else{
    return `"${name}" is already a pet!`
  }// end of the pet exists check

  return jsonparse //returns the value of the new string so that it can be consoled logged.

}//End of the CREATE function





//REMOVE function
const remove = (name) => {
  //Reads the contents of the file and converts it into utf-8 format
  const contents = fs.readFileSync('./data/pets.json', 'utf-8')

  //Parse the string content of the file into real JSON that I can work with
  const jsonparse = JSON.parse(contents)

  /*This is a function to check if a certain named pet already exists in the array.
  The function returns true if the pet exists and false if the pet doesn't exist.
  This test will be used later.*/
  const checkifpetexists = jsonparse.some((item) => {
      //Test if the name of the item for each iteration is the same as the name that is being passed into the function.
      if(item.name === name){
        return true;
      }
      return false;
  })

  //Checks to see if pet doesn't yet exist
  if(!checkifpetexists){
      return `No pet found by the name of "${name}"`;
  }


  //Search to see if name being passed is already an item in the array.
  jsonparse.some((item, index) => {

      if(item.name === name){
        console.log(item);
        //Remove the item using its index as the position and also console out what is being removed from the array
        jsonparse.splice(index, 1);
        //Make json into a string again so that I can write it back to the file
        const stringy = JSON.stringify(jsonparse)
        //Replace the contents of the pets file with the newly stringified json string
        fs.writeFileSync('./data/pets.json', stringy)

        //return item;

      }
  })

  return '';

} //End of the REMOVE function




//UPDATE Function
const update = (name, kind, age) => {

  //Reads the contents of the file and converts it into utf-8 format
  const contents = fs.readFileSync('./data/pets.json', 'utf-8')

  //Parse the string content of the file into real JSON that I can work with
  const jsonparse = JSON.parse(contents)

  /*This is a function to check if a certain named pet already exists in the array.
  The function returns true if the pet exists and false if the pet doesn't exist.
  This test will be used later.*/
  const checkifpetexists = jsonparse.some((item) => {
      //Test if the name of the item for each iteration is the same as the name that is being passed into the function.
      if(item.name === name){
        return true;
      }
      return false;
  })

  //Checks to see if pet doesn't yet exist
  if(!checkifpetexists){
      return `No pet found by the name of "${name}"`;
  }else{
    //Search to see if name being passed is already an item in the array.
    jsonparse.some((item, index) => {
        //Test to see if the current pet name is the same as the pet name being passed in function.
        if(item.name === name){
          item.name = name; //Update pet name with new name passed
          item.kind = kind; //Update pet kind with new kind passed
          item.age = age;   //Update pet age with new age passed
          //Make json into a string again so that I can write it back to the file
          const stringy = JSON.stringify(jsonparse)
          //Replace the contents of the pets file with the newly stringified json string
          fs.writeFileSync('./data/pets.json', stringy)

          console.log(item);
        }
    })
    // return jsonparse
  }
  return '';

} //End of the UPDATE function




 /* CONSOLE LOGS*/
 console.log(read())

 console.log(create('Duchess', 'bird', 2))

 console.log(create('Duchess', 'bird', 2))

 console.log(remove('Snoopy'))

 console.log(remove('Duchess'))

 console.log(read())

 console.log(update('Duchess', 'bird', 3))

 console.log(update('Meowser', 'cat', 4))

 console.log(read())

 console.log(update('Meowser', 'cat', 3))
