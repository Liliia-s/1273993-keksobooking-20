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

  var toggleStateOfElements = function (elements) {
    elements.forEach(function (element) {
      element.toggleAttribute('disabled');
    });
  };

  var setInitialStates = function () {
    window.form.setAdressMapPinMain(MAP_PIN_MAIN_ROUND_HALF_HEIGHT);
    toggleStateOfElements(elementsOfAdForm);
    toggleStateOfElements(elementsOfMapForm);
    window.util.mapPinMain.addEventListener('mousedown', window.pinMainMove.mousedownHandler);
    window.util.toggleActiveElement(mapForm, NAME_CLASS_HIDDEN);
  };

  setInitialStates();

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
    window.util.toggleActiveElement(window.cardShow.map, NAME_CLASS_MAP);
    window.util.toggleActiveElement(adForm, NAME_CLASS_AD);
    toggleStateOfElements(elementsOfAdForm);
    window.util.toggleActiveElement(mapForm, NAME_CLASS_HIDDEN);
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
    setInitialStates: setInitialStates,
    mapPinMousedownHandler: mapPinMousedownHandler,
    mapPinKeydownHandler: mapPinKeydownHandler,
    getFilterInputHandler: function () {
      return filterInputHandler;
    }
  };
})();
