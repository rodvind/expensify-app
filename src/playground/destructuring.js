// Object Destructuring

// const person = {
//     name: 'Rodvin',
//     age: 30,
//     location: {
//         city: 'Calgary',
//         temp: 13
//     }
// };
// This line is equivalant to two lines down below. This syntax is like an import
//const { name, age } = person;
// const name = person.name;
// const age = person.age;
//console.log(`${name} is ${age}.`);

// if (person.location.city && person.location.tem) {
//     console.log(`it's ${person.location.tem} in ${person.location.city}.`);
// }
// Better way to re-write the upper code with desctructuring
// const { city, temp } = person.location;
// if (city && temp) {
//     console.log(`It's ${temp} in ${city}.`);
// }

// if we want to use another variable name instead of 'temp', we can use:
// const { city, temp: temperature} = person.location;
// if (city && temperature) {
//     console.log(`It's ${temperature} in ${city}.`);
    
// }

// Set up a default value using destructuring
// const { name: firstName = 'Anonymous' } = person;
// console.log(`${firstName} is ${age}`);

// Challenge
// const book = {
//     name: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };
// const { name: bookName = 'Anonymous' } = book;
// const { name: publisherName = 'Self-Published' } = book.publisher;
// console.log(`The publisher name for the "${bookName}" book is ${publisherName}.`);

// Array Destructuring

const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
//const [street, city, state, zip] = address;
//const [, city, ,zip] = address;
const [, city, state] = address;
console.log(`You are in ${city} ${state}.`);


// Completely valid syntax to use for an empty array and set up a default value
// const address = [];
// const [,, state = 'NewYork'] = address;
// console.log(`You are in ${state}.`);

// Challenge
const item = ['Coffee (hot)', '$2.00', '$2.55', '$2.75'];
const [productName, , medium] = item;
console.log(`A medium ${productName} costs ${medium}.`);

