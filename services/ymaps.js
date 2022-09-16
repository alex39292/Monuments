'use strict';

module.exports = (x, y) => {
    return `<script>
    var myMap;
    var myPlacemarkvar;
      ymaps.ready(init);

      function init() {
      myMap = new ymaps.Map('map', {
        center: [${x}, ${y}],
        zoom: 16,
        type: 'yandex#satellite'
      });
      myPlacemark = new ymaps.GeoObject({
          geometry: {
              type: "Point",
              coordinates: [${x}, ${y}]
        }
        });
        myMap.geoObjects.add(myPlacemark); 
      }
  </script>`;
}