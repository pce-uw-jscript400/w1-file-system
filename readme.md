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

* **Your Answer:**  We want to modify it many times and test many times without committing each time.

---

- [ ] Take a look at the NodeJS documentation for the [fs module](https://nodejs.org/api/fs.html). When looking at documentation like this it can be overwhelming to start but you likely know more than you think. Take a moment to find a few concepts you understand.

---

- [ ] One of the most common patterns we'll come across as web developers is the concept of [CRUD](https://www.codecademy.com/articles/what-is-crud). Take a moment to define what CRUD represents.


* **Question:** Imagine you have a file called `classmates.txt`. For each part of CRUD, describe how the action would interact with the file.

* **Your Answer:**  
** Create would add a new classmate.
** Read would read one or many classmates.
** Update would update an existing classmate.
** Delete would delete an existing classmate.

---

- [ ] Consider the above and then look back through the [fs module](https://nodejs.org/api/fs.html) documentation.

* **Question:** What methods represent each CRUD action?

* **Your Answer:** 
** Create: appendFile
** Read: read or readFile
** Update: write
** Delete: No good way to delete a single item, need an array operation like slice.  Unlink to delete an entire file.

---

- [ ] Take a look at the following two methods: [fs.readFile()](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback) and [fs.readFileSync()](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options).

* **Question:** What is the difference between these two methods?

* **Your Answer:**  readFileSync blocks, nothing else runs until it completes.  readFile is asynchronous, code will continue to run while results are being obtained.

---

- [ ] Take a look at [fs.writeFile()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) and [fs.appendFile()](https://nodejs.org/api/fs.html#fs_fs_appendfile_path_data_options_callback).

* **Question:** Describe the difference between these two methods.

* **Your Answer:**  writeFile creates or overwrites a file.  appendFile adds the content to the end of the file.

---

- [ ] Imagine you want to edit the middle of a file. You can use the [fs module](https://nodejs.org/api/fs.html) and the JavaScript language.

* **Question:** How would you do so?

* **Your Answer:**  For a small amount of data reading the data into an array and manipulating it there is an option.  [write](https://nodejs.org/api/fs.html#fs_fs_write_fd_buffer_offset_length_position_callback) is an option for random access.

---

- [ ] In Node, you'll have access to a global variable called `__dirname`. Add the following to your `index.js` file.
  ```js
  const path = require('path')
  const petsFile = path.join(__dirname, 'data', 'pets.json')
  ```

* **Question:** Describe what is happening in the above code.

* **Your Answer:**  It concatenates the file parts using the system separator, ie './data/pets.json'

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