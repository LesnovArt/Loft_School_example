/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

listTable.addEventListener('click', (e) => {
    const aim = e.target;

    if (aim.tagName === 'BUTTON') {
        let delCookieName = aim.closest('tr').children[0].textContent;

        deleteCookie(delCookieName);      
        let elem = aim.closest('tr');

        elem.parentNode.removeChild(elem);
    }
})

function deleteCookie(name) {
    let cookieDate = new Date(); 

    cookieDate.setTime( cookieDate.getTime() - 1 );
    document.cookie = name += "=; expires=" + cookieDate.toGMTString();
}

function addTable(name, value) {
    let newTr = document.createElement('tr');
    let newThOne = document.createElement('td');
    let newThTwo = document.createElement('td');
    let deleteButton = document.createElement('button');

    newTr.classList.add('oldCookies');

    newThOne.innerText = name;
    newThTwo.innerText = value;
    deleteButton.innerText = 'удалить';

    newTr.append(newThOne);
    newTr.append(newThTwo);
    newTr.append(deleteButton);
    listTable.append(newTr);
}

function getCookies(name) {
    let results = document.cookie.match ( '(^|;) ?' + name + '=([^;]*)(;|$)' );

    if (results)
        return (unescape (results[2]) );
    else
        return null;
}

function setCookies(name, value) {
    let cookiesStr = name + '=' + escape(value);   
    document.cookie = cookiesStr;

    addTable(name, value)
}

// filterNameInput.addEventListener('keyup', function() {
//     // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
//     console.log(document.cookie);
//     addTable()
// });

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    if (!addNameInput.value) {
        addNameInput.placeholder = 'empty field ! ! !';
        return;
    } else if (!addValueInput.value) {
        addValueInput.placeholder = 'empty field ! ! !';
        return;
    }

    if( getCookies(addNameInput.value)){
        console.log(document.cookie = `${addNameInput.value}=${addValueInput.value}`);
        changeCookieValue(addNameInput.value, addValueInput.value)
    } else {
        setCookies(addNameInput.value, addValueInput.value);
    };

    
    addNameInput.value = '';
    addValueInput.value = '';
});

function changeCookieValue(name, value) {
    let rows = [...listTable.children];

    for (let row of rows) {
        if (row.children[0].textContent === name) {
            row.children[1].textContent = value;
        }
    }
}