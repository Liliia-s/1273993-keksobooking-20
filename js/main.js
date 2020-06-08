'use strict';

var TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 100];
var GUESTS = [0, 1, 2, 3];
var CHECKINS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var LOCATION_X = document.querySelector('.map').clientWidth;
var MAP = document.querySelector('.map');

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 1-й пункт задания: написание функции для создания массива из 8 сгенерированных JS-объектов
var createArrayAnnouncements = function () {
  var arrayAnnouncements = [];

  for (var i = 1; i < 9; i++) {
    arrayAnnouncements.push({
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      'offer': {
        'title': 'Объявление о размещении жилья владельца № ' + i,
        'address': '' + Math.floor(Math.random() * LOCATION_X) + ', ' + getRandomIntInclusive(130, 630),
        'price': getRandomIntInclusive(0, 1000000),
        'type': TYPE_OF_HOUSING[getRandomIntInclusive(0, TYPE_OF_HOUSING.length - 1)],
        'rooms': ROOMS[getRandomIntInclusive(0, ROOMS.length - 1)],
        'guests': GUESTS[getRandomIntInclusive(0, GUESTS.length - 1)],
        'checkin': CHECKINS[getRandomIntInclusive(0, CHECKINS.length - 1)],
        'checkout': CHECKINS[getRandomIntInclusive(0, CHECKINS.length - 1)],
        'features': FEATURES.slice(getRandomIntInclusive(0, FEATURES.length - 1), FEATURES.length),
        'description': 'Описание жилья и условия размещения владельца № ' + i,
        'photos': PHOTOS.slice(getRandomIntInclusive(0, PHOTOS.length - 1), PHOTOS.length)
      },
      'location': {
        'x': Math.floor(Math.random() * LOCATION_X),
        'y': getRandomIntInclusive(130, 630)
      }
    }
    );
  }
  return arrayAnnouncements;
};

var allAnnouncements = createArrayAnnouncements();

// 2-й пункт задания: удаление класса .map--faded у блока .map
MAP.classList.remove('map--faded');

// 3-й пункт задания: создание DOM-элементов на основе 1 задания
var pinTemplate = document.querySelector('#pin').content;
var pinTemplateButton = pinTemplate.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

var createDomElement = function (user) {
  var mapPin = pinTemplateButton.cloneNode(true);
  var mapPinImg = mapPin.querySelector('img');
  mapPinImg.src = user.author.avatar;
  mapPinImg.alt = user.offer.title;
  mapPin.style.left = user.location.x - 25 + 'px';
  mapPin.style.top = user.location.y - 70 + 'px';

  return mapPin;
};

// 4-й пункт задания: отрисовка сгенерированных DOM-элементов в блок .map__pins на основе 1 задания

var createMapPins = function () {
  for (var j = 0; j < allAnnouncements.length; j++) {
    var pin = createDomElement(allAnnouncements[j]);
    mapPins.appendChild(pin);
  }
};

createMapPins();
