'use strict';

(function () {
  var ONE_HUNDRED_ROOMS = 100;
  var MAP_PIN_MAIN_WIDTH = 65;
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var inputAdress = document.querySelector('#address');
  var mapPinMain = window.util.mapPinMain;
  var mapPinMainOffSetLeft = mapPinMain.offsetLeft;
  var mapPinMainOffSetTop = mapPinMain.offsetTop;

  // валидация поля Заголовок объяления

  var inputTitle = document.querySelector('#title');

  var inputTitleInputHandler = function () {
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
    inputTitle.reportValidity();
  };

  // заполнение поля Адрес

  var setAdressMapPinMain = function (mapPinMainHeight) {
    var positionX = mapPinMainOffSetLeft + Math.round(MAP_PIN_MAIN_WIDTH / 2);
    var positionY = mapPinMainOffSetTop + mapPinMainHeight;
    inputAdress.value = positionX + ', ' + positionY;
  };

  // валидация полей Тип жилья и Цена за ночь

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

  // валидация полей Время заезда и выезда

  var fieldTimein = document.querySelector('#timein');
  var fieldTimeout = document.querySelector('#timeout');

  var fieldTimeinInputHandler = function () {
    fieldTimeout.value = fieldTimein.value;
  };

  var fieldTimeoutInputHandler = function () {
    fieldTimein.value = fieldTimeout.value;
  };

  // валидация полей Количество комнат и Количество мест

  var fieldRooms = document.querySelector('#room_number');
  var fieldGuests = document.querySelector('#capacity');

  var setRoomsAndGuests = function () {
    var indexGuest = fieldGuests.selectedIndex;
    var indexRoom = fieldRooms.selectedIndex;
    if (parseInt(fieldRooms.value, 10) === ONE_HUNDRED_ROOMS && fieldGuests.value !== '0') {
      fieldRooms.setCustomValidity('Для ' + fieldRooms.options[indexRoom].label + ' допустимое значение кол-во мест: ' + fieldGuests.options[indexRoom].label);
    } else if (fieldGuests.value === '0' && parseInt(fieldRooms.value, 10) !== ONE_HUNDRED_ROOMS) {
      fieldRooms.setCustomValidity('Для ' + fieldGuests.options[indexGuest].label + ' допустимое значение кол-во комнат: ' + fieldRooms.options[indexGuest].label);
    } else if (fieldRooms.value < fieldGuests.value) {
      fieldRooms.setCustomValidity('Допустимое кол-во гостей не должно превышать кол-во комнат');
    } else {
      fieldRooms.setCustomValidity('');
    }
    fieldRooms.reportValidity();
  };

  setRoomsAndGuests();

  var fieldRoomsInputHandler = function () {
    setRoomsAndGuests();
  };

  var fieldGuestsInputHandler = function () {
    setRoomsAndGuests();
  };

  var addEventListeners = function () {
    inputTitle.addEventListener('input', inputTitleInputHandler);
    fieldType.addEventListener('input', fieldTypeInputHandler);
    fieldTimein.addEventListener('input', fieldTimeinInputHandler);
    fieldTimeout.addEventListener('input', fieldTimeoutInputHandler);
    fieldRooms.addEventListener('input', fieldRoomsInputHandler);
    fieldGuests.addEventListener('input', fieldGuestsInputHandler);
    mapPinMain.addEventListener('mousedown', window.pinMainMove.mousedownHandler);
  };

  var removeEventListeners = function () {
    inputTitle.removeEventListener('input', inputTitleInputHandler);
    fieldType.removeEventListener('input', fieldTypeInputHandler);
    fieldTimein.removeEventListener('input', fieldTimeinInputHandler);
    fieldTimeout.removeEventListener('input', fieldTimeoutInputHandler);
    fieldRooms.removeEventListener('input', fieldRoomsInputHandler);
    fieldGuests.removeEventListener('input', fieldGuestsInputHandler);
  };

  window.form = {
    MAP_PIN_MAIN_WIDTH: MAP_PIN_MAIN_WIDTH,
    inputAdress: inputAdress,
    setAdressMapPinMain: setAdressMapPinMain,
    fieldTypeInputHandler: fieldTypeInputHandler,
    addEventListeners: addEventListeners,
    removeEventListeners: removeEventListeners
  };
})();
