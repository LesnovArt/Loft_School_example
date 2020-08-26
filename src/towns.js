/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
    const newDiv = document.createElement('div');
    homeworkContainer.appendChild(newDiv);
 */
import {loadAndSortTowns} from './index';

const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return loadAndSortTowns();
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
/* block with button retry */
const retryBlock = homeworkContainer.querySelector('#retry-block');
/* get button for reloading */
const reloadButton = homeworkContainer.querySelector('#reload');

/* hide blocks while making loading */
let towns = [];

retryBlock.classList.add('hidden');
filterBlock.classList.add('hidden');

reloadButton.addEventListener('click', () => {
    getTowns();
})

filterInput.addEventListener('keyup', function() {
    // это обработчик нажатия кливиш в текстовом поле
    filterUpdate(this.value)
});

/* async function for loading towns & catching errors */
async function getTowns () {
    try {
        towns = await loadTowns();
        retryBlock.classList.add('hidden');
        loadingBlock.classList.add('hidden');
        filterBlock.classList.remove('hidden');
    } catch (e) {
        console.log('Не удалось загрузить города');
        loadingBlock.classList.add('hidden');
        retryBlock.classList.remove('hidden');
    }
}

function filterUpdate(filterValue) {
    filterResult.innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (const town of towns) {
        if (filterValue && isMatching(town.name, filterValue)) {
            const matchDiv = document.createElement('div');

            matchDiv.textContent = town.name;
            fragment.append(matchDiv);
        }
    }

    filterResult.append(fragment);
}

getTowns();

export {
    loadTowns,
    isMatching
};
