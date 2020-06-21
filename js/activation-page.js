'use strict';

(function () {
  var MAP_PIN_MAIN_ROUND_HALF_HEIGHT = 31;
  var MAP_PIN_MAIN_HEIGHT = 82;
  var NAME_CLASS_MAP = 'map--faded';
  var NAME_CLASS_AD = 'ad-form--disabled';
  var KEY_CODE_ENTER = 13;
  var KEY_CODE_MOUSE_LEFT = 0;
  var elementsOfForms = document.querySelectorAll('form input, form select, form textarea, .ad-form__submit');
  var adForm = document.querySelector('.ad-form');
  var mapPins = document.querySelector('.map__pins');

  var activateElement = function (element, className) {
    element.classList.remove(className);
  };

  var toggleStateOfElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].toggleAttribute('disabled');
    }
  };

  toggleStateOfElements(elementsOfForms);
  window.formValidation.setAdressMapPinMain(MAP_PIN_MAIN_ROUND_HALF_HEIGHT);

  var activateStatePage = function () {
    activateElement(window.cardShow.map, NAME_CLASS_MAP);
    activateElement(adForm, NAME_CLASS_AD);
    toggleStateOfElements(elementsOfForms);
    mapPins.appendChild(window.pin.create(window.dataCreate.allAnnouncements));
    window.formValidation.setAdressMapPinMain(MAP_PIN_MAIN_HEIGHT);
    window.formValidation.mapPinMain.removeEventListener('mousedown', mapPinMousedownHandler);
    window.formValidation.mapPinMain.removeEventListener('keydown', mapPinKeydownHandler);
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

  window.formValidation.mapPinMain.addEventListener('mousedown', mapPinMousedownHandler);
  window.formValidation.mapPinMain.addEventListener('keydown', mapPinKeydownHandler);
})();
