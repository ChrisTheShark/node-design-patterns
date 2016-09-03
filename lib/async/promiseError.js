"use strict";

function promiseMeSomething() {
  return new Promise((resolve, reject) => {
    reject(new Error('BLAMO!'));
    //resolve('Told you I would.');
  });
}

promiseMeSomething().then((messsage) => {
  console.log(messsage);
}).catch((error) => {
  console.log('Error block: ', error);
});
