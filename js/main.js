'use strict';

var MIN_VALUE = 0;
var MAX_PRICE = 1000000;
var TYPES_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
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
var MAP = document.querySelector('.map');

var getRandomIntInclusive = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (listElements) {
  var randomElement = listElements[getRandomIntInclusive(MIN_VALUE, listElements.length - 1)];
  return randomElement;
};

var getRandomSlice = function (listElements) {
  var randomSlice = listElements.slice(getRandomElement(listElements), listElements.length);
  return randomSlice;
};

// 1-й пункт задания: написание функции для создания массива из 8 сгенерированных JS-объектов
var createAnnouncements = function (amountAnnouncements) {
  var announcements = [];
  for (var i = MIN_VALUE; i < amountAnnouncements; i++) {
    announcements.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Объявление о размещении жилья владельца',
        address: '' + getRandomIntInclusive(MIN_VALUE, locationX) + ', ' + getRandomIntInclusive(MIN_VALUE_Y, MAX_VALUE_Y),
        price: getRandomIntInclusive(MIN_VALUE, MAX_PRICE),
        type: getRandomElement(TYPES_OF_HOUSING),
        rooms: getRandomIntInclusive(1, 100),
        guests: getRandomIntInclusive(MIN_VALUE, 20),
        checkin: getRandomElement(CHECKINS),
        checkout: getRandomElement(CHECKINS),
        features: getRandomSlice(FEATURES),
        description: 'Описание жилья и условия размещения владельца',
        photos: getRandomSlice(PHOTOS)
      },
      location: {
        x: getRandomIntInclusive(MIN_VALUE, locationX),
        y: getRandomIntInclusive(MIN_VALUE_Y, MAX_VALUE_Y)
      }
    }
    );
  }
  return announcements;
};

var allAnnouncements = createAnnouncements(8);

// 2-й пункт задания: удаление класса .map--faded у блока .map
MAP.classList.remove('map--faded');

// 3-й пункт задания: создание DOM-элементов на основе 1 задания
var pinTemplate = document.querySelector('#pin').content;
var pinTemplateButton = pinTemplate.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var MAP_PIN_WIDTH = 25;
var MAP_PIN_HEIGHT = 70;
var fragment = document.createDocumentFragment();

var createDomElement = function (user) {
  var mapPin = pinTemplateButton.cloneNode(true);
  var mapPinImg = mapPin.querySelector('img');
  mapPinImg.src = user.author.avatar;
  mapPinImg.alt = user.offer.title;
  mapPin.style.left = user.location.x - MAP_PIN_WIDTH + 'px';
  mapPin.style.top = user.location.y - MAP_PIN_HEIGHT + 'px';
  return mapPin;
};

// 4-й пункт задания: отрисовка сгенерированных DOM-элементов в блок .map__pins на основе 1 задания

var createMapPins = function (listAnnouncements) {
  for (var i = MIN_VALUE; i < listAnnouncements.length; i++) {
    var pin = createDomElement(listAnnouncements[i]);
    fragment.appendChild(pin);
  }
  return fragment;
};

mapPins.appendChild(createMapPins(allAnnouncements));
