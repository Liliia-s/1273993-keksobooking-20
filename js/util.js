'use strict';

(function () {
  var KEY_CODE_ENTER = 13;
  var KEY_CODE_MOUSE_LEFT = 0;
  var KEY_CODE_ESC = 27;
  var NAME_CLASS_PIN = '.map__pin:not(.map__pin--main)';
  var adForm = document.querySelector('.ad-form');
  var mapForm = document.querySelector('.map__filters');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');

  var elementsRemove = function (className) {
    var elements = document.querySelectorAll(className);
    elements.forEach(function (element) {
      element.remove();
    });
  };

  var toggleActiveElement = function (element, className) {
    element.classList.toggle(className);
  };

  window.util = {
    KEY_CODE_ENTER: KEY_CODE_ENTER,
    KEY_CODE_MOUSE_LEFT: KEY_CODE_MOUSE_LEFT,
    KEY_CODE_ESC: KEY_CODE_ESC,
    NAME_CLASS_PIN: NAME_CLASS_PIN,
    adForm: adForm,
    mapForm: mapForm,
    mapPins: mapPins,
    mapPinMain: mapPinMain,
    elementsRemove: elementsRemove,
    toggleActiveElement: toggleActiveElement
  };
})();
