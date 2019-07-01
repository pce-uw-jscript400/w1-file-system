const fs = require('fs');

let fileHandler = {
    readFile: function(){
        const contents = fs.readFileSync('./data/pets.json','utf-8');
        return JSON.parse(contents);
    },
    writeFile:function(json){
        const fileContents = fileHandler.readFile();
        for(let i = 0; i < fileContents.length; i++){
            if(fileContents[i].name === json.name){
                return `${json.name} is already a pet`;
            }
        }
        fileContents.push(json);
        let data = JSON.stringify(fileContents);
        fs.writeFileSync('./data/pets.json', data);
        return fileContents;
    },
    updateFile: function(json){
        let data = fileHandler.readFile();
        let petFound = false;
        let petIndex = -1;
        for(let i = 0; i < data.length; i++){
            if(json.name === data[i].name){
                data[i].kind = json.kind;
                data[i].age = json.age;
                petFound = true;
                petIndex = i;
            }
        }
        if(!petFound){
            return `No pet found by the name of ${json.name}`;
        }
        let newData = JSON.stringify(data);
        fs.writeFileSync('./data/pets.json', newData);
        return fileHandler.readFile();
    },
    removeElement: function(name){
        let data = fileHandler.readFile();
        let petFound = false;
        let petIndex = -1;
        for(let i = 0; i < data.length; i++){
            if(name === data[i].name){
                petFound = true;
                petIndex = i;
            }
        }
        if(!petFound){
            return `No pet found by the name of ${name}`;
        }
        const removedData = data.splice(petIndex,1);
        let newData = JSON.stringify(data);
        fs.writeFileSync('./data/pets.json', newData);
        return removedData;
    }
    
};
module.exports = {
    read : function(){
        return fileHandler.readFile();
    },

    create: function(name, kind, age){
        const pet = {name: name, kind: kind, age: age};
        return fileHandler.writeFile(pet);
    },
    remove: function(name){
        return fileHandler.removeElement(name);
    },
    update: function(name, kind, age){
        const pet = {name: name, kind: kind, age: age};
        return fileHandler.updateFile(pet);
    }
}