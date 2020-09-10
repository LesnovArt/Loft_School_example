ymaps.ready(init);


let geoObjects = [];
let newPlacemark;

function init() {  //  init the map and point the center
    const myMap = new ymaps.Map('map', {
        center: [50.00, 36.23],
        zoom: 13,
        controls: ['zoomControl'],
    });


    let placemarks = [];

    const fullscreenControl = new ymaps.control.FullscreenControl();  // fullscreen mode
    myMap.controls.add(fullscreenControl);
    fullscreenControl.enterFullscreen();

    myMap.events.add('click', function (e) {  // catch the clicks on the map and process it
        // get coords of click
        const coords = e.get('coords');
        // if we already have it? change it`s location
        // if (newPlacemark) {
        //     newPlacemark.geometry.setCoordinates(coords);
        // }
        // // if no - create
        // else {
        //     // newPlacemark = createPlacemark(coords);
        //     myMap.geoObjects.add(newPlacemark);
        //     // listen the event of replacing
        //     newPlacemark.events.add('dragend', function () {
        //         getAddress(newPlacemark.geometry.getCoordinates());
        //     });
            
        // }
        getAddress(coords);
    });
    
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }

    // find out the adress
    function getAddress(coords) {
        newPlacemark = createPlacemark(coords);
        myMap.geoObjects.add(newPlacemark);
        newPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);

            return newPlacemark.properties
                .set({
                    // create balloon
                    iconCaption: [
                        // get cityName
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // get the way to number of building or marker
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // add the balloon`s content
                    balloonContent:  [
                        `<div class="ballon_adress">${firstGeoObject.getAddressLine()}</div>`,
                        '<div class="ballon_reviews">Отзывов пока нет...</div>',
                        '<div class="ballon_title">ВАШ ОТЗЫВ</div>',
                        '<form class="ballon_form">',
                            '<input class="ballon_form-name" name="name" placeholder="Ваше имя"></input>',
                            '<input class="ballon_form-adress" name="adress" placeholder="Укажите место"></input>',
                            '<textarea class="ballon_form-review" name="review" placeholder="Поделитесь впечатлениями"></textarea>',
                        '</form>',
                        '<button class="balloon_add">добавить</button>',
                    ].join(''),                   
                });  
        })
        .then(function (reviewObj) {
            
        
            myMap.balloon.events.add('click', function (e) {
                const target = e.get('target');
                const balloonButton = target.properties.get('balloonContentFooter');

                placemarks.push(reviewObj.get(0));
                console.log(placemarks);
                target.properties.set('balloonContent', 'Thank`s');

            })
        })
    }
    
}



