/* ДЗ 5 - DOM Events */

/*
 Задание 1:

 Функция должна добавлять обработчик fn события eventName к элементу target

 Пример:
   addListener('click', document.querySelector('a'), () => console.log('...')) // должна добавить указанный обработчик кликов на указанный элемент
 */
function addListener(eventName, target, fn) {
    // add event listener with function fn to the target
    target.addEventListener(eventName, fn);   
}

/*
 Задание 2:

 Функция должна удалять у элемента target обработчик fn события eventName

 Пример:
   removeListener('click', document.querySelector('a'), someHandler) // должна удалить указанный обработчик кликов на указанный элемент
 */
function removeListener(eventName, target, fn) {
    // removed event listener with function fn from the target
    target.removeEventListener(eventName, fn);    
}

/*
 Задание 3:

 Функция должна добавить к элементу target такой обработчик на события eventName, чтобы он отменял действия по умолчанию

 Пример:
   skipDefault('click', document.querySelector('a')) // после вызова функции, клики на указанную ссылку не должны приводить к переходу на другую страницу
 */
function skipDefault(eventName, target) {
    // add event listener with function fn to the target
    target.addEventListener(eventName, (event) => { 
        // cancel default event of 'eventName'    
        event.preventDefault();
    })
}

/*
 Задание 4:

 Функция должна эмулировать событие click для элемента target

 Пример:
   emulateClick(document.querySelector('a')) // для указанного элемента должно быть сэмулировано события click
 */
function emulateClick(target) {
    // emulate event 'click'
    target.dispatchEvent(new MouseEvent('click'));
}

/*
 Задание 5:

 Функция должна добавить такой обработчик кликов к элементу target,
 который реагирует (вызывает fn) только на клики по элементам BUTTON внутри target

 Пример:
   delegate(document.body, () => console.log('кликнули на button')) // добавит такой обработчик кликов для body, который будет вызывать указанную функцию только если кликнули на кнопку (элемент с тегом button)
 */
function delegate(target, fn) {
    // add event listener with function fn to the target
    target.addEventListener('click', (e) => {
        // check the target is <button>
        if (e.target.tagName === 'BUTTON') {
            // release our function
            fn();
        }
    })
}

/*
 Задание 6:

 Функция должна добавить такой обработчик кликов к элементу target,
 который сработает только один раз и удалится (перестанет срабатывать для последующих кликов по указанному элементу)

 Пример:
   once(document.querySelector('button'), () => console.log('обработчик выполнился!')) // добавит такой обработчик кликов для указанного элемента, который вызовется только один раз и затем удалится
 */
function once(target, fn) {
    // creat a global variable with flag 'false'
    let removeClick = false;

    // add event listener with function fn to the target
    target.addEventListener('click', () => {
        // check, if flag is false
        if (!removeClick) {
            // release our function 
            fn();
            // change value of flag
            removeClick = true;
        }
    });
}

export {
    addListener,
    removeListener,
    skipDefault,
    emulateClick,
    delegate,
    once
};
