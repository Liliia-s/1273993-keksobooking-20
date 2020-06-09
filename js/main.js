'use strict';

var NUMBER_OF_ANNOUNCEMENTS = 8;
var MIN_VALUE = 0;
var MAX_PRICE = 1000000;
var TYPES_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
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
var MAP_PIN_HALF_WIDTH = 25;
var MAP_PIN_HEIGHT = 70;
var locationX = document.querySelector('.map').clientWidth;
var map = document.querySelector('.map');

var getRandomIntInclusive = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (elements) {
  return elements[getRandomIntInclusive(MIN_VALUE, elements.length - 1)];
};

var getRandomSlice = function (elements) {
  return elements.slice(getRandomElement(elements), elements.length);
};


// 1-й пункт задания: написание функции для создания массива из 8 сгенерированных JS-объектов
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
        address: '' + coordinateX + ', ' + coordinateY,
        price: getRandomIntInclusive(MIN_VALUE, MAX_PRICE),
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

// 2-й пункт задания: удаление класса .map--faded у блока .map
map.classList.remove('map--faded');

// 3-й пункт задания: создание DOM-элементов на основе 1 задания
var pinTemplate = document.querySelector('#pin').content;
var pinTemplateButton = pinTemplate.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var createDomElement = function (user) {
  var mapPin = pinTemplateButton.cloneNode(true);
  var mapPinImg = mapPin.querySelector('img');

  mapPinImg.src = user.author.avatar;
  mapPinImg.alt = user.offer.title;
  mapPin.style.left = user.location.x - MAP_PIN_HALF_WIDTH + 'px';
  mapPin.style.top = user.location.y - MAP_PIN_HEIGHT + 'px';
  return mapPin;
};

// 4-й пункт задания: отрисовка сгенерированных DOM-элементов в блок .map__pins на основе 1 задания

var createMapPins = function (announcements) {
  for (var i = 0; i < announcements.length; i++) {
    var pin = createDomElement(announcements[i]);
    fragment.appendChild(pin);
  }
  return fragment;
};

mapPins.appendChild(createMapPins(allAnnouncements));
