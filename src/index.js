import './css/style.css';
import render from './template/modal.hbs';
import renderRevi from './template/reviews.hbs';
import { formatDateBaloon, formatDateModal } from './js/getDates';

ymaps.ready(init);

function init() {
    const create = document.querySelector('.create');
    let storage = localStorage;
    let allPlacemarks;
    let thisAdress;
    let thisCoords;
    let placeObject = [];

    const customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="baloon-container">' +
        '<div class="baloon-container__top">' +
        '<div class="ballon_place ballon_our"><strong>{{ properties.reviews.place|raw }}</strong></div>' +
        '<a href="#" id="links" class="ballon_adres ballon_our">{{ properties.adressReview|raw }}</a>' +
        '<div class="ballon_area ballon_our">{{ properties.reviews.area|raw }}</div>' +
        '</div>' +
        '<span class="ballon_time ballon_our">{{ properties.date|raw }}</span>' +
        '</div>', {
        build: function () {
            customItemContentLayout.superclass.build.call(this);
            document.querySelector('#links').addEventListener('click', this.onCounterClick);
        },
        clear: function () {
            document.querySelector('#links').removeEventListener('click', this.onCounterClick);
            customItemContentLayout.superclass.clear.call(this);
        },
        onCounterClick: function (e) {
            e.preventDefault();

            let name = findName(e.target.previousElementSibling.textContent);

            reviewModal(e.target.textContent, name);
            handleComments(e.target.textContent);

            myMap.balloon.close();
        }
    });

    try {
        allPlacemarks = JSON.parse(storage.data);
    } catch (e) {
        allPlacemarks = undefined;
    };

    const myMap = new ymaps.Map('maps', {
        center: [55.7482921, 37.5900027],
        zoom: 13
    });

    myMap.events.add('click', function (e) {
        if (create.innerHTML != '') {
            create.innerHTML = '';
            handleModal(e);
        } else {
            handleModal(e);
        }
    });

    function handleModal(e) {
        let coords = e.get('coords');

        ymaps.geocode(coords)
            .then(res => res.geoObjects.get(0).getAddressLine())
            .then(address => reviewModal(address, coords))
    };

    function findName(place) {
        let keeper = clusterer.getGeoObjects();
        let t;

        keeper.forEach(obj => {
            if (place === obj.properties._data.reviews.place) {
                t = obj.geometry._coordinates;
            }
        })

        return t;
    };

    function createPlacemark(coords, adress, arrRev, arcivedDate) {
        let comentDate;

        if (!arcivedDate) {
            comentDate = formatDateBaloon(new Date);
        } else {
            comentDate = arcivedDate;
        };

        let mark = new ymaps.Placemark(coords, {
            adressReview: adress,
            reviews: arrRev,
            date: comentDate
        }, {
            preset: 'islands#violetIcon',
        });

        placeObject.push({
            coord: coords,
            adres: adress,
            review: arrRev,
            date: comentDate
        });

        storage.data = JSON.stringify(placeObject);
        myMap.geoObjects.add(mark);
        clusterer.add(mark);

        return mark;
    };

    function reviewModal(adress, coords) {
        create.innerHTML = render({ position: adress });
        thisAdress = adress;
        thisCoords = coords;
        const df = document.querySelector('.review-container__header');

        df.addEventListener('mousedown', function moces(event) {
            event.preventDefault();

            let dragElem = create;
            dragElem.style.position = 'absolute';
            let coords = getCoords(dragElem);
            let shiftX = event.pageX - coords.left;
            let shiftY = event.pageY - coords.top;

            moveAt(event.pageX, event.pageY);
            function moveAt(pageX, pageY) {
                dragElem.style.left = pageX - shiftX + 'px';
                dragElem.style.top = pageY - shiftY + 'px';
            };

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            };

            document.addEventListener('mousemove', onMouseMove);
            dragElem.onmouseup = () => {
                document.removeEventListener('mousemove', onMouseMove);
                dragElem.onmousemove = null;
                dragElem.onmouseup = null;
            };

            function getCoords(elem) {
                let box = elem.getBoundingClientRect();

                return {
                    top: box.top + pageYOffset,
                    left: box.left + pageXOffset
                }
            };
        });

        create.addEventListener('click', e => {
            let nameValue = document.querySelector('.i-name').value;
            let place = document.querySelector('.i-place').value;
            let area = document.querySelector('.i-area').value;
            let btn = e.target.className === 'i-btn';

            if (e.target.className === 'close-reviews') {
                create.innerHTML = '';
            } else if (btn && nameValue) {
                let nowDate = formatDateModal(new Date);

                createPlacemark(thisCoords, thisAdress, {
                    name: nameValue,
                    place,
                    area,
                    dateModal: nowDate
                });

                document.querySelector('.i-name').value = '';
                document.querySelector('.i-place').value = '';
                document.querySelector('.i-area').value = '';

                handleComments(thisAdress);
            } else if (btn && !nameValue) {
                alert('Пожалуйста, введите имя.')
            };
        });
    };

    function handleComments(address) {
        let keeper = clusterer.getGeoObjects();
        let comments = new Array;

        keeper.forEach(obj => {
            if (address === obj.properties._data.adressReview) {
                comments.push(obj.properties._data.reviews);
            }
        });

        document.querySelector('.reviews').innerHTML = renderRevi(comments);
    };

    myMap.geoObjects.events.add('click', function (e) {
        const infoObj = e.get('target').properties._data;
        const coords = e.get('coords');

        if (infoObj.geoObjects) {
            return null;
        } else {
            reviewModal(infoObj.adressReview, coords);
            handleComments(infoObj.adressReview);
        };
    });

    let clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        preset: 'islands#invertedVioletClusterIcons',
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonItemContentLayout: customItemContentLayout,
        clusterBalloonPanelMaxMapArea: 0,
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 130,
        clusterBalloonPagerSize: 5
    });

    myMap.geoObjects.add(clusterer);
    if (allPlacemarks) {
        allPlacemarks.forEach(elem => {
            createPlacemark(elem.coord, elem.adres, elem.review, elem.date);
        })
    }
}