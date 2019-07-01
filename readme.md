# File Interaction with Node

By the end of this lesson, you should be able to read, write, and update files with NodeJS.

## Core Learning Objective

*	Use NodeJS APIs to interact with files and the web

## Sub-Objectives

* Define CRUD
* Read from files
* Overwrite files
* Programmatically update files

### Prereqs

Before starting this lesson, Fork & Clone this repository. Make sure that you can run `npm start` and that you get the following output:
```
Hello, Node!
```

### Instructions & Guiding Questions

- [ ] Begin by renaming `data/pets.sample.json` to `pets.json`

* **Question:** In this lesson we will be modifying the contents of the `pets.json` file. Why do you think that file appears inside of the `.gitignore` file?

* **Your Answer:** Because it is the file that I am manipulating during the development of the project, I don't want git to track every change that is made to that file, including all my creates, updates and removes.

---

- [ ] Take a look at the NodeJS documentation for the [fs module](https://nodejs.org/api/fs.html). When looking at documentation like this it can be overwhelming to start but you likely know more than you think. Take a moment to find a few concepts you understand.

---

- [ ] One of the most common patterns we'll come across as web developers is the concept of [CRUD](https://www.codecademy.com/articles/what-is-crud). Take a moment to define what CRUD represents.

* **Question:** Imagine you have a file called `classmates.txt`. For each part of CRUD, describe how the action would interact with the file.

* **Your Answer:**
C - Create an entry of a student or students in the text file using the fs module using methods like .writeFileSync() or .writeFile(). Important to note that with these 2 methods, if the file file already exists, it will overwrite contents of the file with new values. If file doesn't yet exists, then it will also create it.

R - Read the contents of file using methods like .readFileSync() or .readFile(). Returned content will be a buffer unless you specify the content type. Type 'utf-8' will return the contents as a string.

U - In order to update contents of the file, I would need to read the file first using .readFile() or .readFileSync(). Depending on the contents of the file, I may need to parse it so that I can iterate over each item. Then, be able to locate the item you are wanting to update by using some sort of loop or javascript method to find the right item to update. Once I find the correct item, update it and then overwrite the contents of the whole file with the newly updated content using .writeFileSync() or .writeFile() methods.

D - Open and read the file to get its contents. Depending on the content, I may need to parse so that I can loop over individual entry. Assuming in this case that the content is an array of items, then I would loop through each entry so that I can locate the correct item to remove. Once I know the index of the item that I want to remove, use .splice() to remove it from the array. Once that element is removed, overwrite the contents of the whole file with the new array using the .writeFile() or .writeFileSync() methods.

---

- [ ] Consider the above and then look back through the [fs module](https://nodejs.org/api/fs.html) documentation.

* **Question:** What methods represent each CRUD action?

* **Your Answer:**
C - .writeFileSync()
R - .readFileSync()
U - .readFileSync() and .writeFileSync() #Need both to update
D - .readFileSync() and .writeFileSync() #Need both to update

---

- [ ] Take a look at the following two methods: [fs.readFile()](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback) and [fs.readFileSync()](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options).

* **Question:** What is the difference between these two methods?

* **Your Answer:** .readFile() is asynchronous meaning it is non blocking. It will run without preventing code after it from running. It also requires a callback function. On the other hand, .readFileSync() is blocking which means that nothing else will run after this line until the whole file is read.


---

- [ ] Take a look at [fs.writeFile()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) and [fs.appendFile()](https://nodejs.org/api/fs.html#fs_fs_appendfile_path_data_options_callback).

* **Question:** Describe the difference between these two methods.

* **Your Answer:** .writeFile() replaces everything that is existing within a file, whereas .appendFile() adds to the end of existing content in a file. Both method create a new file if it doesn't already exist.

---

- [ ] Imagine you want to edit the middle of a file. You can use the [fs module](https://nodejs.org/api/fs.html) and the JavaScript language.

* **Question:** How would you do so?

* **Your Answer:** I would use the .readFile() method to read the contents of the file. Parse the file so that I can loop through each entry. Assuming the content of the file is an array of object, I would find the length of this array, calculate the half of this length, making sure to round so that its a whole number. This number would then give me the index of the middle entry which I can then update its values. Once the new values of this entry is completed, I would then update the contents of the whole file using .writeFile().

---

- [ ] In Node, you'll have access to a global variable called `__dirname`. Add the following to your `index.js` file.
  ```js
  const path = require('path')
  const petsFile = path.join(__dirname, 'data', 'pets.json')
  ```

* **Question:** Describe what is happening in the above code.

* **Your Answer:** The global variable `__dirname` has a value of the directory path of the code that is being ran. In this case the code that is executed when we type `npm start` is the `index.js` file. So the value of the global variable is the directory path to our project folder. The .join() method brings together the full path to our `pets.json` which is in the `data` folder(second argument in the .join).

### Exercise

You now have the knowledge needed to edit files on your file system. **A note of caution:** this means you have the ability to delete files programmatically from your machine. That can be pretty dangerous! In this exercise and class, we will never be deleting any files programmatically. If you ever find yourself in a situation where you do need to do so, be careful.

For the rest of the time we have, use the knowledge you've gained to build functions that will modify data inside of the `pets.json` file. You should be able to **create** new pets, **read** information about all your pets, **update** a pet's information, and **delete** a pet from your records.

Assuming your `pets.json` starts with one pet like so:

```json
[
  {
    "name": "Meowser",
    "kind": "cat",
    "age": 3
  }
]
```

You should make the following functions and they should return the values that are commented out.

```js
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
```

#### Resources

* [NodeJS: File System](https://nodejs.org/api/fs.html)
* [Codecademy: What is CRUD?](https://www.codecademy.com/articles/what-is-crud)
