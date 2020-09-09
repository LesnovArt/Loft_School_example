ymaps.ready(init);

let placemarks = [];
let geoObjects = [];
let newPlacemark;

function init() {  //  init the map and point the center
    const myMap = new ymaps.Map('map', {
        center: [50.00, 36.23],
        zoom: 13,
        controls: ['zoomControl'],
    });

    const fullscreenControl = new ymaps.control.FullscreenControl();  // fullscreen mode
    myMap.controls.add(fullscreenControl);
    fullscreenControl.enterFullscreen();

    myMap.events.add('click', function (e) {  // catch the clicks on the map and process it
        // get coords of click
        const coords = e.get('coords');
        // if we already have it? change it`s location
        if (newPlacemark) {
            newPlacemark.geometry.setCoordinates(coords);
        }
        // if no - create
        else {
            newPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(newPlacemark);
            // listen the event of replacing
            newPlacemark.events.add('dragend', function () {
                getAddress(newPlacemark.geometry.getCoordinates());
            });
            placemarks.push(newPlacemark);
        }
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
        newPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);

            newPlacemark.properties
                .set({
                    // create balloon
                    iconCaption: [
                        // get cityName
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // get the way to number of building or marker
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // add the balloon`s content
                    balloonContent: firstGeoObject.getAddressLine()
                });
        });
    }

//     // function adds placemarks onto the map
//     function updateMap() {   
//         for (let i = 0; i < placemarks.length; i++) {  // 
//             geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude], {
//                 hintContent: placemarks[i].hintContent,
//                 balloonContent: placemarks[i].balloonContent
//             },
//             {
//                 // iconLayout: 'default#Image',
//                 // iconImageHref: '',
//                 // iconImageSize: [46, 57],
//                 // iconImageOffset: [-23, -57]
//             })           
//         }    
//         const clusterer = new ymaps.Clusterer({  // create clusterer
//             // clusterIcons: [
//             //     {
//             //         href: '',
//             //         size: [100, 100],
//             //         offset: [-50, -50]
//             //     }
//             // ],
//             // clusterIconContentLayout: null
//         });
//         myMap.geoObjects.add(clusterer);  // added clusterer
//         clusterer.add(geoObjects);  // added objects into the clusterer
//     }
}
