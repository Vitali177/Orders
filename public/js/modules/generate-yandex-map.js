export function generateYandexMap(lat, lng) {
  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [lat, lng],
            zoom: 7
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Это красивая метка'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: './assets/img/icon-map.png',
            // Размеры метки.
            iconImageSize: [42, 42]
        });

    myMap.geoObjects.add(myPlacemark);
  });
}