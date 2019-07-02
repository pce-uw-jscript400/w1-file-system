const fs = require('fs');
module.exports = {
  readFile: () => {
    return fs.readFileSync('./data/pets.json', 'utf-8')
  },
  read: () => {
    const pets = module.exports.readFile()
    return JSON.parse(pets)
  },
  checkName: (name) => {
    let exists = false
    let itemIndex = null
    let pets = module.exports.readFile()
    pets = JSON.parse(pets)
    pets.forEach( (obj,idx) => {
      if (obj.name == name) {
        exists = true
        itemIndex = idx
        return
      }
    });
    return { 
      isIndexed: exists, 
      indexValue: itemIndex 
    }
  },
  create: (name, kind, age) => {
    if (module.exports.checkName(name).isIndexed) {
      return `"${name}" is already a pet!`
    }
    let pets = module.exports.readFile();
    pets = JSON.parse(pets);
    pets.push({name,kind,age})
    pets = JSON.stringify(pets)
    fs.writeFileSync('./data/pets.json', pets, 'utf-8')
    return module.exports.read();
  },
  remove: (name) => {
    const checkName = module.exports.checkName(name)
    if (!checkName.isIndexed) {
      return `No pet found by the name of "${name}"`
    }
    let pets = module.exports.readFile();
    pets = JSON.parse(pets);
    let deleted = pets.splice(checkName.indexValue,1)
    pets = JSON.stringify(pets)
    fs.writeFileSync('./data/pets.json', pets, 'utf-8')
    return deleted    
  },
  update: (name, kind, age) => {
    const checkName = module.exports.checkName(name)
    if (!checkName.isIndexed) {
      return `No pet found by the name of "${name}"`
    }
    let pets = module.exports.readFile();
    pets = JSON.parse(pets);
    let deleted = pets.splice(checkName.indexValue,1,{name,kind,age})
    pets = JSON.stringify(pets)
    fs.writeFileSync('./data/pets.json', pets, 'utf-8')
    return module.exports.read();
  }
}