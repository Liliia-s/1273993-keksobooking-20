'use strict';

(function () {
  var NUMBER_OF_ANNOUNCEMENTS = 8;
  var MIN_VALUE = 0;
  var PRICE_MAX = 1000000;
  var TYPES_OF_HOUSING = ['bungalo', 'flat', 'house', 'palace'];
  var MIN_NUMBER_OF_ROOMS = 1;
  var MAX_NUMBER_OF_ROOMS = 100;
  var MAX_NUMBER_OF_GUESTS = 20;
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var MIN_VALUE_Y = 130;
  var MAX_VALUE_Y = 630;
  var locationX = document.querySelector('.map').clientWidth;

  var getRandomIntInclusive = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (elements) {
    return elements[getRandomIntInclusive(MIN_VALUE, elements.length - 1)];
  };

  var getRandomSlice = function (elements) {
    var length = elements.length;
    var begin = getRandomIntInclusive(MIN_VALUE, length - 2);
    var end = getRandomIntInclusive(begin + 1, length);
    return elements.slice(begin, end);
  };

  var createAnnouncements = function (amountAnnouncements) {
    var announcements = [];
    for (var i = 0; i < amountAnnouncements; i++) {
      var coordinateX = getRandomIntInclusive(MIN_VALUE, locationX);
      var coordinateY = getRandomIntInclusive(MIN_VALUE_Y, MAX_VALUE_Y);

      announcements.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: 'Объявление о размещении жилья владельца',
          address: coordinateX + ', ' + coordinateY,
          price: getRandomIntInclusive(MIN_VALUE, PRICE_MAX),
          type: getRandomElement(TYPES_OF_HOUSING),
          rooms: getRandomIntInclusive(MIN_NUMBER_OF_ROOMS, MAX_NUMBER_OF_ROOMS),
          guests: getRandomIntInclusive(MIN_VALUE, MAX_NUMBER_OF_GUESTS),
          checkin: getRandomElement(CHECKINS),
          checkout: getRandomElement(CHECKINS),
          features: getRandomSlice(FEATURES),
          description: 'Описание жилья и условия размещения владельца',
          photos: getRandomSlice(PHOTOS)
        },
        location: {
          x: coordinateX,
          y: coordinateY
        }
      }
      );
    }
    return announcements;
  };

  var allAnnouncements = createAnnouncements(NUMBER_OF_ANNOUNCEMENTS);

  window.dataCreate = {
    allAnnouncements: allAnnouncements
  };
})();
