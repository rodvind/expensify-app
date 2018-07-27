// Promises will be created for us
// promise calls only one resolve or reject, after that it's gonna ignore
// other resolves or rejects.
// resolve only resolve one argument/value, if we want to reslove more than
// one argument, we must use an object
// When we resolve a promise, we're saying: hey, this thing we expected
// to happen, it happened
// When things don't go as we expected we use reject

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    //resolve('This is my resolved data');
    resolve({
      name: 'Rodvin',
      age: 34
    });
    //reject('Something went wrong!');
  }, 5000);
});

console.log('before');

// Chain promises, using couple of then(). We can use the value returned
// from the first then() call
// We also are able to return a promise and use that
// Second then() call is the success case for the first then(). The second then()
// will only run when the first promise actually resolves
promise.then((data) => {
  console.log('1', data);
  //return 'some data';
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('This is my other promise');
    }, 5000);
  });
}).then((str) => {
  console.log('does this run?', str);
}).catch((error) => {
  console.log('error: ', error);
});

// promise.then((data) => {
//   console.log(data);
// }, (error) => {
//   console.log('error: ', error);
// });

console.log('after');
