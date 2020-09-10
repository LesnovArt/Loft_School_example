            // Создание макета содержимого балуна.
        // Макет создается с помощью фабрики макетов с помощью текстового шаблона.
        BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="margin: 10px;">' +
                '<b>{{properties.name}}</b><br />' +
                '<i id="count"></i> ' +
                '<button id="counter-button"> +1 </button>' +
            '</div>', {

            // Переопределяем функцию build, чтобы при создании макета начинать
            // слушать событие click на кнопке-счетчике.
            build: function () {
                // Сначала вызываем метод build родительского класса.
                BalloonContentLayout.superclass.build.call(this);
                // А затем выполняем дополнительные действия.
                $('#counter-button').bind('click', this.onCounterClick);
                $('#count').html(counter);
            },

            // Аналогично переопределяем функцию clear, чтобы снять
            // прослушивание клика при удалении макета с карты.
            clear: function () {
                // Выполняем действия в обратном порядке - сначала снимаем слушателя,
                // а потом вызываем метод clear родительского класса.
                $('#counter-button').unbind('click', this.onCounterClick);
                BalloonContentLayout.superclass.clear.call(this);
            },

            onCounterClick: function () {
                $('#count').html(++counter);
                if (counter == 5) {
                    alert('Вы славно потрудились.');
                    counter = 0;
                    $('#count').html(counter);
                }
            }
        });

    var placemark = new ymaps.Placemark([55.650625, 37.62708], {
            name: 'Считаем'
        }, {
            balloonContentLayout: BalloonContentLayout,
            // Запретим замену обычного балуна на балун-панель.
            // Если не указывать эту опцию, на картах маленького размера откроется балун-панель.
            balloonPanelMaxMapArea: 0
        });

    map.geoObjects.add(placemark);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // function template() {

    //     return ['<div class = "ballon-wrapper">', 
    //         '<div class="ballon_adress"></div>', 
    //         '<div class="ballon_reviews"></div>', 
    //         '<div class="ballon_title"></div>',
    //         '<form class="ballon_form">',
    //             '<input name="name" placeholder="Ваше имя"></input>',
    //             '<input name="adress" placeholder="Укажите место"></input>',
    //             '<input name="review" placeholder="Поделитесь впечатлениями"></input>',
    //         '</form>',
    //         '<button class="balloon_add"></button>',
    //     '</div>',].join('');
    // }
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
// console.log(firstGeoObject.getAddressLine())