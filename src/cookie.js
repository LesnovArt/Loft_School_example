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

listTable.addEventListener('click', (e) => {  // find cookie in browser and on the table and remove it by click
    const aim = e.target;

    if (aim.tagName === 'BUTTON') {
        let delCookieName = aim.closest('tr').children[0].textContent;

        deleteCookie(delCookieName);      
        let cookieDel = aim.closest('tr');

        cookieDel.parentNode.removeChild(cookieDel);
    }
})

function deleteCookie(name) {  // change expire date
    let cookieDate = new Date(); 

    cookieDate.setTime( cookieDate.getTime() - 1 );
    document.cookie = name += "=; expires=" + cookieDate.toGMTString();
}

function addTable(name, value) {  // add table in tbody
    let newTr = document.createElement('tr');
    let tdName = document.createElement('td');
    let tdValue = document.createElement('td');
    let tdDel = document.createElement('td');
    let deleteButton = document.createElement('button');

    newTr.classList.add('addedCookies');

    tdName.innerText = name;
    tdValue.innerText = value;
    deleteButton.innerText = 'удалить';

    tdDel.append(deleteButton);
    newTr.append(tdName);
    newTr.append(tdValue);
    newTr.append(tdDel);
    listTable.append(newTr);
}

function getCookie(name) {  // give cookie by the name
    let cookie = document.cookie.match ( '(^|;) ?' + name + '=([^;]*)(;|$)' );

    if (cookie)
        return (unescape (cookie[2]) );
    else
        return null;
}

function setCookies(name, value) {   // set cookie value into the browser and put on the table
    let cookiesStr = name + '=' + escape(value); 
    
    document.cookie = cookiesStr;
    addTable(name, value);
}

filterNameInput.addEventListener('keyup', function() {  // render searching cookies
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    let rows = [...listTable.children];
    
    for (let row of rows) {      
        let rowTd = row.children;

        clearTable();
        if (rowTd[0].textContent.includes(filterNameInput.value)) {           
            addTable(rowTd[0].textContent, rowTd[1].textContent);
        } 
        if (filterNameInput.value.length === 0) {
            clearTable();
            renderTable();
        }
    }
});

addButton.addEventListener('click', () => {    // add cookies after click and check values of inputs
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    if (!addNameInput.value) {
        addNameInput.placeholder = 'empty field ! ! !';
        return;
    } else if (!addValueInput.value) {
        addValueInput.placeholder = 'empty field ! ! !';
        return;
    }

    if( getCookie(addNameInput.value)){
        document.cookie = `${addNameInput.value}=${addValueInput.value}`;
        changeCookieValue(addNameInput.value, addValueInput.value);
    } else {
        setCookies(addNameInput.value, addValueInput.value);
    };

    
    addNameInput.value = '';
    addValueInput.value = '';
});

function changeCookieValue(name, value) {  // change value, if we have already this one
    let rows = [...listTable.children];

    for (let row of rows) {
            let rowTd = row.children;
        if (rowTd[0].textContent === name) {
            rowTd[1].textContent = value;
        }
    }
}

function renderTable() {     // render cookies on the table
    if (!filterNameInput.value) {         
        let cookies = document.cookie
            .split('; ')
            .filter(Boolean)
            .map(cookie => cookie.match(/^([^=]+)=(.+)/))
            .reduce((obj, [, name, value]) => {
                obj[name] = value;
    
                return obj;
        }, {});
        
        for (let cookie in cookies) {           
            addTable(cookie, getCookie(cookie));
            
        }
    }
}

function clearTable() {   // clear tbody
    let addedCookies = homeworkContainer.querySelector('.addedCookies');

    addedCookies.parentNode.removeChild(addedCookies);    
}

renderTable();



