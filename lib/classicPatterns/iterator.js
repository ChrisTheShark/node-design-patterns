'use strict';

function sum(numbers, finish) {
    let result = 0;
    (function iterator(index) {
        if (index === numbers.length) {
            return finish && finish(result);
        }
        result += numbers[index];
        iterator(++index);
    })(0);
}

sum([1, 2, 3, 4, 5, 6, 7, 8, 9], (result) => {
    console.log(result);
});
