/* ДЗ 2 - работа с массивами и объектами */

/*
    Задание 1:

    Напишите аналог встроенного метода forEach для работы с массивами
    Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
// let array = [2, 3]
function forEach(array, fn, thisArg) {
    for (let i = 0; i < array.length; i++) {
        fn.call(thisArg, array[i], i, array);
    }
}

// forEach(array, console.log);

/*
    Задание 2:

    Напишите аналог встроенного метода map для работы с массивами
    Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
// let mass = [2, 3, 5]
function map(array, fn, thisArg) {   
    const newArray = [];

    for (let i = 0; i < array.length; i++) {
        newArray.push(fn.call(thisArg, array[i], i, array));
    }
    
    return newArray;
}

// map(mass, Math.pow);

/*
    Задание 3:

    апишите аналог встроенного метода reduce для работы с массивами
    Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
// let redArray = [2, 3, 5];
function reduce(array, fn, initial) {
    let i = 0
    let result = initial || array[0];

    if (result !== initial) {
        i = 1;
    }

    for (i; i < array.length; i++) {
        result = fn(result, array[i], i, array);
    }

    return result;
}

// let someResult = reduce(redArray, function (a, b) {
//     return a * b;
// }, 1);

// // console.log(someResult)

/*
  Задание 4:

  Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

  Пример:
    upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
// let user = {
//     name: 'Сергей',
//     lastName: 'Петров'
// };

function upperProps(obj) {
    return Object.keys(obj).map((item) => item.toUpperCase());
}
// console.log(upperProps(user));
/*
 Задание 5 *:

  Напишите аналог встроенного метода slice для работы с массивами
  Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    if ((from === undefined && to === undefined) || (from === 0 && to === undefined)) {
        return array;
    }

    const result = []; 
    let _from = from;

    if (from === undefined) {
        _from = 0;
    }

    if (_from < 0) {
        _from = 0;
    }

    if (_from > array.length) {
        return result;
    }

    let _to = to;

    if ( to === undefined) {
        _to =array.length;
    }

    if (to < 0) {
        _to = array.length + to;
    }

    if (to > array.length) {
        _to = array.length;
    }

    for (let position = _from; position < _to; position++) {
        result.push(array[position]);
    }

    return result;
}

// let slArray = [23, 25, 42, 54, 48];

// function slice(array, from = 0, to = array.length) {
//     const slicedArray = [];
//     let start = from >= 0 ? from : array.length + from;
//     let end = to > 0 ? to : array.length + to;
//     let size = array.length;

//     if (end < start) {
//         return [];
//     } 
//     size = end - start;

//     if (size > 0) {           
//         for (let i = 0; i < size; i++) {
//             slicedArray.push(array[start++]);
//         }
//     }

//     return slicedArray;
// }
// console.log(slice(slArray, 2, 4));
// console.log(slArray.slice(2, 4))

/*
 Задание 6 *:

  Функция принимает объект и должна вернуть Proxy для этого объекта
  Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(obj, key, value) {
            obj[key] = value ** 2;

            return true;
        },
    });
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
