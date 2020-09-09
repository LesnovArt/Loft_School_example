ymaps.ready(init);

let placemarks = [
    {
        latitude: 50.005,
        longitude: 36.23,
        hintContent: 'hint',
        balloonContent: 'ballon'
    },
];

let geoObjects = [];

function init() {  //  init the map and point the center
    const myMap = new ymaps.Map('map', {
        center: [50.00, 36.23],
        zoom: 13,
        controls: ['zoomControl'],
        behaviors: ['drag'],
    });

    const fullscreenControl = new ymaps.control.FullscreenControl();  // fullscreen mode
    myMap.controls.add(fullscreenControl);
    fullscreenControl.enterFullscreen();

    myMap.events.add('click', function (e) {  // catch the clicks on the map and process it
        // Получение координат щелчка
        let newPlacemark = {};
        const coords = e.get('coords');

        newPlacemark.latitude = coords[0];
        newPlacemark.longitude = coords[1];
        placemarks.push(newPlacemark);
        console.log(placemarks);
        updateMap();
    });
    
    // function adds placemarks onto the map
    function updateMap() {   
        for (let i = 0; i < placemarks.length; i++) {  // 
            geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude], {
                hintContent: placemarks[i].hintContent,
                balloonContent: placemarks[i].balloonContent
            },
            {
                // iconLayout: 'default#Image',
                // iconImageHref: '',
                // iconImageSize: [46, 57],
                // iconImageOffset: [-23, -57]
            })           
        }    
        const clusterer = new ymaps.Clusterer({  // create clusterer
            // clusterIcons: [
            //     {
            //         href: '',
            //         size: [100, 100],
            //         offset: [-50, -50]
            //     }
            // ],
            // clusterIconContentLayout: null
        });
        myMap.geoObjects.add(clusterer);  // added clusterer
        clusterer.add(geoObjects);  // added objects into the clusterer
    }
}
