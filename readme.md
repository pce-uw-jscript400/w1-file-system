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

* **Your Answer:**

--- Files referenced in `.gitignore` are ignored during commit. A file or directory can be identified in `.gitignore` for many reasons, such as sensitive data files, api keys, etc. Let's pretend that pets.json is a sensitive data file.

- [ ] Take a look at the NodeJS documentation for the [fs module](https://nodejs.org/api/fs.html). When looking at documentation like this it can be overwhelming to start but you likely know more than you think. Take a moment to find a few concepts you understand.

---

- [ ] One of the most common patterns we'll come across as web developers is the concept of [CRUD](https://www.codecademy.com/articles/what-is-crud). Take a moment to define what CRUD represents.

* **Question:** Imagine you have a file called `classmates.txt`. For each part of CRUD, describe how the action would interact with the file.

* **Your Answer:**

--- CRUD = Create/Read/Update/Delete. Create describes the function(s) used to create the classmates.txt file. Read describes the function(s) used to read the contents of the classmates.txt file. Update describes the function(s) used to update the contents of the classmates.txt file. Delete describes the function(s) used to delete contents from the classmates.txt file.

- [ ] Consider the above and then look back through the [fs module](https://nodejs.org/api/fs.html) documentation.

* **Question:** What methods represent each CRUD action?

* **Your Answer:**

---
-Create: `fs.writeFile(); fs.writeFileSync()`
-Read: `fs.readFile(); fs.readFileSync()`
-Update: `fs.writeFile(); fs.writeFileSync(); fs.appendFile(); fs.appendFileSync()`
-Remove: `fs.ftruncate(); fs.ftruncateSync(); fs.unlink(); fs.unlinkSync()`

- [ ] Take a look at the following two methods: [fs.readFile()](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback) and [fs.readFileSync()](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options).

* **Question:** What is the difference between these two methods?

* **Your Answer:**

--- `fs.readfile()` is asynchronous, meaning it does not run in parallel to other functions/code and will block/must complete first. `fs.readFileSync()` is synchronous, meaning it can run independently of the rest of the code. `fs.readfileSync()` does not take a callback function.

- [ ] Take a look at [fs.writeFile()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) and [fs.appendFile()](https://nodejs.org/api/fs.html#fs_fs_appendfile_path_data_options_callback).

* **Question:** Describe the difference between these two methods.

* **Your Answer:**

---`fs.writeFile()` will author data to the file, will replace any existing data present in the file; `fs.appendFile` will add data to the file, creating the file if does not yet exist. `fs.appendFile` does not overwrite existing data. Both methods are asyncronous, and take a call back function (versus writeFileSync or appendFileSync)

- [ ] Imagine you want to edit the middle of a file. You can use the [fs module](https://nodejs.org/api/fs.html) and the JavaScript language.

* **Question:** How would you do so?

* **Your Answer:**

---First, I need to require fs, then use fs.readFileSync against the file. Next I likely should create a copy of the file contents using variable assignment, so that i can edit content without changing the source file yet. I would then want to identify "the middle" of the file or some target in the contents for edit, and write whatever statements necessary to successfully edit the contents as needed. Lastly, i would replace the file contents with the new, edited contents stored in my variable using fs.writeFileSync. Depending on the type of file or the contents i'm editing, i may need to use other methods or functions such as JSON.Parse or JSON.stringify to ensure the contents are retrieved from/ committed to the file correctly.

- [ ] In Node, you'll have access to a global variable called `__dirname`. Add the following to your `index.js` file.
  ```js
  const path = require('path')
  const petsFile = path.join(__dirname, 'data', 'pets.json')
  ```

* **Question:** Describe what is happening in the above code.

* **Your Answer:**

--- Essentially, we are defining the path to a file `pets.json` by using `path.join` method. `path.join` takes multiple inputs and joins them, and in this example we are taking the directory in which the `index.js` file is found using `__dirname`, and appending to that `/data/pets.json`. This particular path implies the files are in seperate folders. If they were in the same folder, we could simply use` __dirname` and `pets.json`, for example. This path is then assigned to `petsFile` so that it can be referenced elsewhere in the code, such as scenarios where we read, update or delete from that file.

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