# File Interaction with Node

By the end of this lesson, you should be able to read, write, and update files with NodeJS.

## Core Learning Objective

- Use NodeJS APIs to interact with files and the web

## Sub-Objectives

- Define CRUD
- Read from files
- Overwrite files
- Programmatically update files

### Prereqs

Before starting this lesson, Fork & Clone this repository. Make sure that you can run `npm start` and that you get the following output:

```
Hello, Node!
```

### Instructions & Guiding Questions

- [ ] Begin by renaming `data/pets.sample.json` to `pets.json`

* **Question:** In this lesson we will be modifying the contents of the `pets.json` file. Why do you think that file appears inside of the `.gitignore` file?

* **Your Answer:**
  `.gitignore` is useful for preventing certain files for being tracked. In our example we're just using a small `pets.json` file and making many CRUD changes. But, if this app were to grow, start working with a DB and a large engineering team, tracking this files could pose to be a large and painful mess to try and manage.

---

- [ ] Take a look at the NodeJS documentation for the [fs module](https://nodejs.org/api/fs.html). When looking at documentation like this it can be overwhelming to start but you likely know more than you think. Take a moment to find a few concepts you understand.

---

- [ ] One of the most common patterns we'll come across as web developers is the concept of [CRUD](https://www.codecademy.com/articles/what-is-crud). Take a moment to define what CRUD represents.

* **Question:** Imagine you have a file called `classmates.txt`. For each part of CRUD, describe how the action would interact with the file.

* **Your Answer:**
  CRUD is a pattern that gives us 4 common types of operations for building APIS. In RESTful APIs, CRUD often corresponds with HTTP methods, such as `POST`, `GET`, `PUT`, and `DELETE`.

- C - would be a `create` function for generates a new record inside the `classmates.txt` file.
- R - would `read` back all of the records inside the file.
- U - would find and `update` any matching records inside the file.
- D - would `delete` any matching records inside the file.

---

- [ ] Consider the above and then look back through the [fs module](https://nodejs.org/api/fs.html) documentation.

* **Question:** What methods represent each CRUD action?

* **Your Answer:**
  After going through the assignment, these are the methods that helped me acheive CRUD.

- Create - `writeFileSync()`
- Rread - `readFileSync()`
- Update - `writeFileSync()`
- Delete - `writeFileSync()`

---

- [ ] Take a look at the following two methods: [fs.readFile()](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback) and [fs.readFileSync()](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options).

* **Question:** What is the difference between these two methods?

* **Your Answer:**
  `readFile()` is asynchronous, or non-blocking, while `readFileSync()` is blocking. No other code will be executed until `readFileSync()` has finished it's job.

---

- [ ] Take a look at [fs.writeFile()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) and [fs.appendFile()](https://nodejs.org/api/fs.html#fs_fs_appendfile_path_data_options_callback).

* **Question:** Describe the difference between these two methods.

* **Your Answer:**
  `appendFile()` will asynchronously append data to a file and will create a new file if one does not already exist. `writeFile()` will asynchronously write data directionly to a file, replacing it if the file already exists.

---

- [ ] Imagine you want to edit the middle of a file. You can use the [fs module](https://nodejs.org/api/fs.html) and the JavaScript language.

* **Question:** How would you do so?

* **Your Answer:**

1. I would use the `require('fs')` File System mehtod to give me the ability to have CRUD operations via Node.js.
2. I would then declare a `const` and make reference to the file I want to update by doing something like `fs.readFileSync(myExample.json, "utf-8")` which also makes it human readable.
3. Considering I'm using JSON in this example, I would then declare another `const` and levarage `JSON.parse(exampleContents)` which gives me the ability to work with a JavaScript object now.
4. I can then make use of JavaScript array methods, such as `.filter()` and use it to filter out anything that does not match the record I want to update and assign my new array to a `let`.
5. I can then reference that `let` by doing something like `petToUpdate.push(updatedPetRecord)` and push my updated record to my array object.
6. Then I need to declare another `const` and set it to be something like `const petString = JSON.stringify(petToUpdate)` again, because we are working with JSON and turns our object back into a JSON string.
7. Lastly, I can then use the following method `fs.writeFileSync(petsFile, petString)`, which gives me the ability to write to the file in question. The example above, give an optional, but awesome feature, for creating a pathname shortcut.

Let's say you have an update function that takes in certain criteria for a condition to be met. You would then use the following:

I was able to demonstrate this on line 49 of my `index.js` file.

---

- [ ] In Node, you'll have access to a global variable called `__dirname`. Add the following to your `index.js` file.
  ```js
  const path = require("path");
  const petsFile = path.join(__dirname, "data", "pets.json");
  ```

* **Question:** Describe what is happening in the above code.

* **Your Answer:**
  This gives us the Path module, which provides a nice way of creating shortcuts and references to directories and file paths.

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
console.log(read());
// [ { name: 'Meowser', kind: 'cat', age: 3 } ]

console.log(create("Duchess", "bird", 2));
// [
//   { name: 'Meowser', kind: 'cat', age: 3 },
//   { name: 'Duchess', kind: 'bird', age: 2 }
// ]

console.log(create("Duchess", "bird", 2));
// "Duchess" is already a pet!

console.log(remove("Snoopy"));
// No pet found by the name of "Snoopy"

console.log(remove("Duchess"));
// { name: 'Duchess', kind: 'bird', age: 2 }

console.log(read());
// [ { name: 'Meowser', kind: 'cat', age: 3 } ]

console.log(update("Duchess", "bird", 3));
// No pet found by the name of "Duchess"

console.log(update("Meowser", "cat", 4));
// { name: 'Meowser', kind: 'cat', age: 4 }

console.log(read());
// [ { name: 'Meowser', kind: 'cat', age: 4 } ]

console.log(update("Meowser", "cat", 3));
// { name: 'Meowser', kind: 'cat', age: 3 }
```

#### Resources

- [NodeJS: File System](https://nodejs.org/api/fs.html)
- [Codecademy: What is CRUD?](https://www.codecademy.com/articles/what-is-crud)
