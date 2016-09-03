function add(num1, num2, callback) {
  setTimeout(() => {
    return callback(num1 + num2);
  }, 100);
}

console.log('Before method.')
add(1, 2, result => { console.log(result); });
console.log('After method.')
