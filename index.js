const fs = require('fs');
const tools = require('./fileHandler');

console.log(tools.read());
console.log(tools.create('Duchess','bird',2));
console.log(tools.create('Duchess','bird',2));
console.log(tools.remove('Snoopy'));
console.log(tools.remove('Duchess'));
console.log(tools.read());
console.log(tools.update('Duchess','bird', 3));
console.log(tools.update('Meowser','cat', 4));
console.log(tools.read());
console.log(tools.update('Meowser','cat', 3));

