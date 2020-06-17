'use strict';

// 3-я лекция
// 'Личный проект: больше деталей (часть 1)'

var NUMBER_OF_ANNOUNCEMENTS = 8;
var MIN_VALUE = 0;
var PRICE_MAX = 1000000;
var TYPES_OF_HOUSING = ['bungalo', 'flat', 'house', 'palace'];
var MIN_NUMBER_OF_ROOMS = 1;
var ONE_HUNDRED_ROOMS = '100';
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
var MAP_PIN_MAIN_ROUND_HALF_HEIGHT = 31;
var MAP_PIN_MAIN_HEIGHT = 82;
var MAP_PIN_MAIN_WIDTH = 65;
var NAME_CLASS_MAP = 'map--faded';
var NAME_CLASS_AD = 'ad-form--disabled';
var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;
var KEY_CODE_ENTER = 13;
var KEY_CODE_MOUSE_LEFT = 0;
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

// 3-я лекция часть 2
var cardTemplate = document.querySelector('#card').content;
var cardTemplateArticle = cardTemplate.querySelector('.map__card');

var createCardOfAnnouncements = function (user) {
  var card = cardTemplateArticle.cloneNode(true);
  var cardAvatar = card.querySelector('.popup__avatar');
  var cardTitle = card.querySelector('.popup__title');
  var cardAdress = card.querySelector('.popup__text--address');
  var cardPrice = card.querySelector('.popup__text--price');
  var cardType = card.querySelector('.popup__type');
  var cardRoomsAndGuests = card.querySelector('.popup__text--capacity');
  var cardTimeInAndOut = card.querySelector('.popup__text--time');
  var cardFeatures = card.querySelector('.popup__features li');
  var cardDescription = card.querySelector('.popup__description');
  var cardPhotos = card.querySelector('.popup__photos');

  cardAvatar.src = user.author.avatar;
  cardTitle.textContent = user.offer.title;
  cardAdress.textContent = user.offer.address;
  cardPrice.textContent = user.offer.price + ' ₽/ночь';

  var type;
  switch (user.offer.type) {
    case 'bungalo':
      type = 'Бунгало';
      break;
    case 'flat':
      type = 'Квартира';
      break;
    case 'house':
      type = 'Дом';
      break;
    case 'palace':
      type = 'Дворец';
      break;
    default:
      type = 'Без жилья';
      break;
  }

  cardType.textContent = type;
  cardRoomsAndGuests.textContent = user.offer.rooms + ' комнаты для ' + user.offer.guests + ' гостей';
  cardTimeInAndOut.textContent = 'Заезд после ' + user.offer.checkin + ', выезд после ' + user.offer.checkout;

  var feature;
  var allFeatures;

  for (var i = 0; i < user.offer.features.length; i++) {
    switch (user.offer.features[i]) {
      case 'wifi':
        feature = 'WI-FI';
        break;
      case 'dishwasher':
        feature = 'Посудомоечная машина';
        break;
      case 'parking':
        feature = 'Парковка';
        break;
      case 'washer':
        feature = 'Кухня';
        break;
      case 'elevator':
        feature = 'Лифт';
        break;
      case 'conditioner':
        feature = 'Кондиционер';
        break;
      default:
        feature = 'Без удобств';
        break;
    }

    allFeatures += feature + ' ';
  }

  cardFeatures.textContent = allFeatures;
  cardDescription.textContent = user.offer.description;

  for (var j = 0; j < user.offer.photos.length; j++) {
    var cardPhoto = cardPhotos.querySelector('.popup__photo');
    cardPhoto.src = user.offer.photos[j];
    cardPhotos.appendChild(cardPhoto);
  }

  return card;
};

var createCards = function (announcements) {
  for (var i = 0; i < announcements.length; i++) {
    var cardItem = createCardOfAnnouncements(announcements[i]);
    fragment.appendChild(cardItem);
  }
  return fragment;
};

var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');
map.insertBefore(createCards(allAnnouncements), mapFilters);

// var map = document.querySelector('.map');

// 'Личный проект: больше деталей (часть 2)'
// пока не сделала 2 часть 3-й лекции

// 4-я лекция
// 'Личный проект: доверяй, но проверяй (часть 1)'

// 1-й пункт задания: активация страницы
// помимо input и select в задании проекта, также заблокировала поле textarea с Описанием и кнопку Опубликовать

var mapPinMain = document.querySelector('.map__pin--main');
var elementsOfForms = document.querySelectorAll('form input, form select, form textarea, .ad-form__submit');
// var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var inputAdress = document.querySelector('#address');
var mapPinMainOffSetLeft = mapPinMain.offsetLeft;
var mapPinMainOffSetTop = mapPinMain.offsetTop;

var activateElement = function (element, className) {
  element.classList.remove(className);
};

var toggleStateOfElements = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].toggleAttribute('disabled');
  }
};

// 2-й пункт задания: заполнение поля адреса

var setAdressMapPinMain = function (mapPinMainHeight) {
  var positionX = mapPinMainOffSetLeft + Math.round(MAP_PIN_MAIN_WIDTH / 2);
  var positionY = mapPinMainOffSetTop + mapPinMainHeight;
  inputAdress.value = positionX + ', ' + positionY;
};

toggleStateOfElements(elementsOfForms);
setAdressMapPinMain(MAP_PIN_MAIN_ROUND_HALF_HEIGHT);

var activateStatePage = function () {
  activateElement(map, NAME_CLASS_MAP);
  activateElement(adForm, NAME_CLASS_AD);
  toggleStateOfElements(elementsOfForms);
  mapPins.appendChild(createMapPins(allAnnouncements));
  setAdressMapPinMain(MAP_PIN_MAIN_HEIGHT);
  mapPinMain.removeEventListener('mousedown', mapPinMousedownHandler);
  mapPinMain.removeEventListener('keydown', mapPinKeydownHandler);
};

var mapPinMousedownHandler = function (evt) {
  if (evt.button === KEY_CODE_MOUSE_LEFT) {
    activateStatePage();
  }
};

var mapPinKeydownHandler = function (evt) {
  if (evt.keyCode === KEY_CODE_ENTER) {
    activateStatePage();
  }
};

mapPinMain.addEventListener('mousedown', mapPinMousedownHandler);
mapPinMain.addEventListener('keydown', mapPinKeydownHandler);

// 3-й пункт задания: валидация форм

// отображается во время ввода значения, но после попытки отправки - при нажатии на кнопки Опубликовать или Enter
var inputTitle = document.querySelector('#title');

inputTitle.addEventListener('input', function () {
  var valueLength = inputTitle.value.length;

  if (inputTitle.validity.valueMissing) {
    inputTitle.setCustomValidity('Заполните это поле.');
  } else if (valueLength < MIN_TITLE_LENGTH) {
    inputTitle.setCustomValidity('Еще ' + (MIN_TITLE_LENGTH - valueLength) + ' символов');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    inputTitle.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' символов');
  } else {
    inputTitle.setCustomValidity('');
  }
});

var fieldType = document.querySelector('#type');
var fieldPrice = document.querySelector('#price');

var pricesForTypes = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

var fieldTypeInputHandler = function () {
  fieldPrice.setAttribute('min', pricesForTypes[fieldType.value]);
  fieldPrice.setAttribute('placeholder', pricesForTypes[fieldType.value]);
};

fieldType.addEventListener('input', fieldTypeInputHandler);

var fieldTimein = document.querySelector('#timein');
var fieldTimeout = document.querySelector('#timeout');

var fieldTimeinInputHandler = function () {
  fieldTimeout.value = fieldTimein.value;
};

var fieldTimeoutInputHandler = function () {
  fieldTimein.value = fieldTimeout.value;
};

fieldTimein.addEventListener('input', fieldTimeinInputHandler);
fieldTimeout.addEventListener('input', fieldTimeoutInputHandler);

var fieldRooms = document.querySelector('#room_number');
var fieldGuests = document.querySelector('#capacity');

var setRoomsAndGuests = function () {
  var indexGuest = fieldGuests.selectedIndex;
  var indexRoom = fieldRooms.selectedIndex;
  if (fieldRooms.value === ONE_HUNDRED_ROOMS && fieldGuests.value !== '0') {
    fieldRooms.setCustomValidity('Для ' + fieldRooms.options[indexRoom].label + ' допустимое значение кол-во мест: ' + fieldGuests.options[indexRoom].label);
  } else if (fieldGuests.value === '0' && fieldRooms.value !== ONE_HUNDRED_ROOMS) {
    fieldRooms.setCustomValidity('Для ' + fieldGuests.options[indexGuest].label + ' допустимое значение кол-во комнат: ' + fieldRooms.options[indexGuest].label);
  } else if (fieldRooms.value < fieldGuests.value) {
    fieldRooms.setCustomValidity('Допустимое кол-во гостей не должно превышать кол-во комнат');
  } else {
    fieldRooms.setCustomValidity('');
  }
};

setRoomsAndGuests();

var fieldRoomsInputHandler = function () {
  setRoomsAndGuests();
};

var fieldGuestsInputHandler = function () {
  setRoomsAndGuests();
};

fieldRooms.addEventListener('input', fieldRoomsInputHandler);
fieldGuests.addEventListener('input', fieldGuestsInputHandler);

var fieldsCheck = document.querySelectorAll('input, select');
var buttonSubmit = document.querySelector('.ad-form__submit');

var getFieldsInvalid = function () {
  var fieldsInvalid = [];
  fieldsCheck.forEach(function (element) {
    if (element.checkValidity() === false) {
      fieldsInvalid.push(element);
    }
  });
  return fieldsInvalid;
};

var submitClickHandler = function () {
  var invalidElements = getFieldsInvalid();
  if (invalidElements) {
    invalidElements.forEach(function (element) {
      element.style.border = '4px double #f80000';
    });
  }
};

buttonSubmit.addEventListener('click', submitClickHandler);
