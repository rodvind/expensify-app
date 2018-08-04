import * as firebase from "firebase";
//import * as expensesActions from "../actions/expenses";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);
// We never pass an argument to the database()
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// Exports
export { firebase, googleAuthProvider, database as default };


///////////////////////////// CRUD Operations ////////////////////////////

// Try to read data off of the expenses ref
// we're gonna get the return value from val() and dumped it to the screen
// database.ref('expenses')
//   .once('value')
//   .then((snapshot) => {
//     console.log(snapshot.val());
//   });
// To get the returned value work with our application, we need to do a coversion
// we'll use a snapshot method, forEach
// database.ref('expenses')
//   .once('value')
//   .then((snapshot) => {
//     const expenses = [];

//     // it will go through all three expenses objects
//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });

//     console.log(expenses);
//   });

// child_removed subscriber - We don't see the message until
// one of child data got removed
// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// child_changed
// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// child_added - it'll print all the data one time to the screen before
// any child be added to our database
// it doesn't just call for new children, it also gets called for existing one
// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

  // database.ref('expenses').on('value', (snapshot) => {
  //   const expenses = [];

  //   // it will go through all three expenses objects
  //   snapshot.forEach((childSnapshot) => {
  //     expenses.push({
  //       id: childSnapshot.key,
  //       ...childSnapshot.val()
  //     });
  //   });

  //   console.log(expenses);
  // }, (e) => {
  //   console.log('Error with data fetching', e);
  // });
  

// Setup "expenses" with three items (description, note, amount, createdAt)
// database.ref('expenses').push({
//   description: 'Rent',
//   notes: '',
//   amount: 124500,
//   createdAt: 1000
// }); 

// database.ref('expenses').push({
//   description: 'Credit Card',
//   notes: '',
//   amount: 109500,
//   createdAt: -1000
// }); 

// database.ref('expenses').push({
//   description: 'coffee',
//   notes: '',
//   amount: 550,
//   createdAt: 60000
// }); 
//database.ref('expenses/-LID6Yl5HO9TDMsolS91').remove();


// const onValueChange = (snapshot) => {
//   console.log(snapshot.val());
// };

// Have the server to notify us of data changes
// on() is going to allow us to listen for something over and over
// every single time it' changed
// To actually run some code when the data came back, we use a
// callback function
// So, as promises run a single time, and here we want to run the code
// over and over, promises won't work here
// Here, we subscribed to changes, code will run after data got changed

// const onValueChange = database.ref().on('value', (snapshot) => {
//   console.log(snapshot.val());
// }, (e) => {
//   console.log('Error with data fetching', e);
  
// });

//database.ref().on('value', onValueChange);

// setTimeout(() => {
//   database.ref('age').set(34);
// }, 3500);

// Unsubscribe all subscription from database
// setTimeout(() => {
//   database.ref().off(onValueChange);
// }, 7000);

// Unsubscribe from a specific data change
// setTimeout(() => {
//     database.ref().off(onValueChange);
//   }, 7000);

// setTimeout(() => {
//   database.ref('age').set(35);
// }, 10500);

// Get the database data into the JavaScript
// Fetch the data a single time
// once gets one argument and return a promise to do something when 
// data comes back. The data that we'll get back is snapshot
// val() returns data we requested, which is an object (our databe)
// with its all properties

// database.ref()
//   .once('value')
//   .then((snapshot) =>{
//     const val = snapshot.val();
//     console.log(val);  
//   })
//   .catch((e) => {
//     console.log('Error fetching data', e);
//   });

// database.ref('location/city')
// .once('value')
// .then((snapshot) =>{
//   const val = snapshot.val();
//   console.log(val);  
// })
// .catch((e) => {
//   console.log('Error fetching data', e);
// });

// ref() gives us a reference to a specific part of our database, it can get
// an argument which can be equal to the table name in sql. If we don't pass
// any argument in, we'll get a reference to the root of our database
// database.ref().set({
//   name: 'Rodvin Danaei',
//   age: 34,
//   stressLevel: 6,
//   job: {
//     title: "Software Developer",
//     company: 'Google'
//   },
//   //isSingle: false,
//   location: {
//     city: 'Calgary',
//     //province: 'Alberta',
//     country: 'Canada'
//   }
// }).then(() => {
//   console.log('Data is saved!');
// }).catch((e) => {
//   console.log('This failed', e);
// });

// database.ref('age').set(33);
// database.ref('location/city').set('Vancouver');
// database.ref('location/province').set('British Colombia');
// database.ref('attributes/height').set(184);
// database.ref('attributes/weight').set(104);

// database.ref('attributes').set({
//   height: 185,
//   weight: 104
// }).then(() => {
//   console.log('Data is saved!');
// }).catch((e) => {
//   console.log('This failed', e);
// });

//console.log('I made a request to change the data');

// Removing Data from our database
// database.ref('isSingle')
//   .remove()
//   .then(() => {
//     console.log('Data was removed!');
//   }).catch((e) => {
//     console.log('Data was not removed', e);
//   });

// Remove hole databse
// database.ref()
//   .remove()
//   .then(() => {
//     console.log('Data was removed!');
//   }).catch((e) => {
//     console.log('Data was not removed', e);
//   });

// Remove data using set
//database.ref('isSingle').set(null);

// Update multiple properties with the update, it won't update whole
// database with new values, only these properties will be changed
// Also we can add a new property with the updata
// We can also delete data from database by using the value null
// database.ref().update({
//   name: 'Rod',
//   age: 39,
//   job: "Developer",
//   isSingle: null
// });

// IF we want to update the child property of an object in our database
// we need to give the path as a name value inside of the qoute, otherwise,
// it'll treat the property as a new property and wipe out other properties
// (province and country) of the object if they are not mentioned
// and changed inside the update object
// database.ref().update({
//   job: 'Manager',
//   'location/city': 'Vancouver'
// });

// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Vancover'
// });

// database.ref().on('value', (snapshot) => {
//   const val = snapshot.val();
//   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// });

/////////////////// Firebase doesn't support arrays //////////////////

// const notes = [{
//   id: '12',
//   title: 'First note',
//   body: 'This is my note'
// }, {
//   id: '714beqh',
//   title: 'Another note',
//   body: 'This is my note'
// }];

//database.ref('notes').set(notes);
//database.ref('notes/12');
  
// Here is the way that firebase supports list-based data
// push creates random id for our arrays
// database.ref('notes').push({
//   title: 'To Do',
//   body: 'Go for a run'
// });

// Another list
// database.ref('notes').push({
//   title: 'Course Topics',
//   body: 'React Native, Angular, Python'
// });

// const firebaseNotes = {
//   notes: {
//     ansjbdfvd: {
//       title: 'First note!',
//       body: 'This is my note'
//     },
//     bdDGIgfagf: {
//       title: 'Another note!',
//       body: 'This is my note'
//     }
//   }
// };

//database.ref('notes/-LI9iBmuVs9N8brKSDdq').remove();
    