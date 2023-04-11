'use strict';

const obj = {
  name: 'John',
  age: 25,
}

console.log(Object.keys(obj))   // ['name', 'age']
console.log(Object.values(obj)) // ['John', 25]

obj['surname'] = 'Smith'
console.log(Object.keys(obj))   // ['name', 'age', 'surname']
console.log(Object.values(obj)) // ['John', 25, 'Smith']
