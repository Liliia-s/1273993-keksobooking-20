'use strict';

(function () {
  var MAP_PIN_MAIN_ROUND_HALF_HEIGHT = 31;
  var MAP_PIN_MAIN_HEIGHT = 82;
  var NAME_CLASS_MAP = 'map--faded';
  var NAME_CLASS_AD = 'ad-form--disabled';
  var KEY_CODE_ENTER = 13;
  var KEY_CODE_MOUSE_LEFT = 0;
  var adForm = document.querySelector('.ad-form');
  var elementsOfAdForm = adForm.querySelectorAll('input, select, textarea, button');
  var mapForm = document.querySelector('.map__filters');
  var elementsOfMapForm = mapForm.querySelectorAll('input, select');
  var mapPins = document.querySelector('.map__pins');

  var activateElement = function (element, className) {
    element.classList.remove(className);
  };

  var toggleStateOfElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].toggleAttribute('disabled');
    }
  };
  // window.cardShow.mapFilters
  var toggleStateForms = function () {
    toggleStateOfElements(elementsOfAdForm);
    toggleStateOfElements(elementsOfMapForm);
  };

  toggleStateForms();
  window.form.setAdressMapPinMain(MAP_PIN_MAIN_ROUND_HALF_HEIGHT);

  var allAnnouncements;

  var successHandler = function (adverts) {
    var announcements = adverts;
    allAnnouncements = announcements;
    mapPins.appendChild(window.pin.create(announcements));
    toggleStateOfElements(elementsOfMapForm);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; color: white; font-weight: bold; background-color: orange;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '35px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var activateStatePage = function () {
    activateElement(window.cardShow.map, NAME_CLASS_MAP);
    activateElement(adForm, NAME_CLASS_AD);
    toggleStateOfElements(elementsOfAdForm);
    window.load(successHandler, errorHandler);
    // mapPins.appendChild(window.pin.create(window.dataCreate.allAnnouncements));
    window.form.setAdressMapPinMain(MAP_PIN_MAIN_HEIGHT);
    window.form.mapPinMain.removeEventListener('mousedown', mapPinMousedownHandler);
    window.form.mapPinMain.removeEventListener('keydown', mapPinKeydownHandler);
    mapPins.addEventListener('click', window.cardShow.mapPinClickHandler);
  };

  var mapPinMousedownHandler = function (evt) {
    if (evt.button === KEY_CODE_MOUSE_LEFT) {
      evt.preventDefault();
      activateStatePage();
    }
  };

  var mapPinKeydownHandler = function (evt) {
    if (evt.keyCode === KEY_CODE_ENTER) {
      evt.preventDefault();
      activateStatePage();
    }
  };

  window.form.mapPinMain.addEventListener('mousedown', mapPinMousedownHandler);
  window.form.mapPinMain.addEventListener('keydown', mapPinKeydownHandler);

  window.activation = {
    mapPinMousedownHandler: mapPinMousedownHandler,
    mapPinKeydownHandler: mapPinKeydownHandler,
    NAME_CLASS_MAP: NAME_CLASS_MAP,
    NAME_CLASS_AD: NAME_CLASS_AD,
    adForm: adForm,
    toggleStateForms: toggleStateForms,
    getAllAnnouncements: function () {
      return allAnnouncements;
    },
    MAP_PIN_MAIN_ROUND_HALF_HEIGHT: MAP_PIN_MAIN_ROUND_HALF_HEIGHT,
    MAP_PIN_MAIN_HEIGHT: MAP_PIN_MAIN_HEIGHT
  };
})();