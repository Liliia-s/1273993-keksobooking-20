'use strict';

(function () {
  var MAP_PIN_MAIN_ROUND_HALF_HEIGHT = 31;
  var MAP_PIN_MAIN_HEIGHT = 82;
  var NAME_CLASS_MAP = 'map--faded';
  var NAME_CLASS_AD = 'ad-form--disabled';
  var NAME_CLASS_HIDDEN = 'hidden';
  var mapForm = window.util.mapForm;
  var mapPins = window.util.mapPins;
  var adForm = window.util.adForm;
  var elementsOfAdForm = adForm.querySelectorAll('input, select, textarea, button');
  var elementsOfMapForm = mapForm.querySelectorAll('input, select');
  var resetButton = document.querySelector('.ad-form__reset');
  var buttonSubmit = document.querySelector('.ad-form__submit');
  var filterInputHandler;

  var activateElement = function (element, className) {
    element.classList.remove(className);
  }; // переделать в общую функцию с deactivateElement в deactivation и перенести в util

  var toggleStateOfElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].toggleAttribute('disabled');
    }
  };

  var toggleStateForms = function () {
    toggleStateOfElements(elementsOfAdForm);
    toggleStateOfElements(elementsOfMapForm);
  };

  toggleStateForms();
  window.form.setAdressMapPinMain(MAP_PIN_MAIN_ROUND_HALF_HEIGHT);
  mapForm.classList.add('hidden'); // переделать

  var successHandler = function (adverts) {
    window.backend.dataAds = adverts;
    window.filters.getPins();
    filterInputHandler = window.debounce(window.filters.getPins);
    toggleStateOfElements(elementsOfMapForm);
    mapForm.addEventListener('change', filterInputHandler);
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

  var setActiveStateListeners = function () {
    window.util.mapPinMain.removeEventListener('mousedown', mapPinMousedownHandler);
    window.util.mapPinMain.removeEventListener('keydown', mapPinKeydownHandler);
    window.form.addEventListeners();
    window.files.chooserAvatar.addEventListener('change', window.files.loadAvatar);
    window.files.chooserHousing.addEventListener('change', window.files.loadPhotoOfhousing);
    mapPins.addEventListener('click', window.cardShow.mapPinClickHandler);
    adForm.addEventListener('submit', window.formSubmit.handler);
    resetButton.addEventListener('click', window.deactivation.getInactiveStatePage);
    buttonSubmit.addEventListener('click', window.formValidation.buttonSubmit);
  };

  var activateStatePage = function () {
    activateElement(window.cardShow.map, NAME_CLASS_MAP); // переделать
    activateElement(adForm, NAME_CLASS_AD); // переделать
    toggleStateOfElements(elementsOfAdForm);
    activateElement(mapForm, NAME_CLASS_HIDDEN);
    window.backend.loadData(successHandler, errorHandler);
    window.form.setAdressMapPinMain(MAP_PIN_MAIN_HEIGHT);
    setActiveStateListeners();
  };

  var mapPinMousedownHandler = function (evt) {
    if (evt.button === window.util.KEY_CODE_MOUSE_LEFT) {
      evt.preventDefault();
      activateStatePage();
    }
  };

  var mapPinKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.KEY_CODE_ENTER) {
      evt.preventDefault();
      activateStatePage();
    }
  };

  window.util.mapPinMain.addEventListener('mousedown', mapPinMousedownHandler);
  window.util.mapPinMain.addEventListener('keydown', mapPinKeydownHandler);

  window.activation = {
    NAME_CLASS_MAP: NAME_CLASS_MAP,
    NAME_CLASS_AD: NAME_CLASS_AD,
    MAP_PIN_MAIN_ROUND_HALF_HEIGHT: MAP_PIN_MAIN_ROUND_HALF_HEIGHT,
    MAP_PIN_MAIN_HEIGHT: MAP_PIN_MAIN_HEIGHT,
    resetButton: resetButton,
    buttonSubmit: buttonSubmit,
    mapPinMousedownHandler: mapPinMousedownHandler,
    mapPinKeydownHandler: mapPinKeydownHandler,
    toggleStateForms: toggleStateForms,
    getFilterInputHandler: function () {
      return filterInputHandler;
    }
  };
})();
