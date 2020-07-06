'use strict';

(function () {
  var KEY_CODE_ENTER = 13;
  var KEY_CODE_MOUSE_LEFT = 0;
  var KEY_CODE_ESC = 27;
  var adForm = document.querySelector('.ad-form');
  var mapForm = document.querySelector('.map__filters');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');

  window.util = {
    KEY_CODE_ENTER: KEY_CODE_ENTER,
    KEY_CODE_MOUSE_LEFT: KEY_CODE_MOUSE_LEFT,
    KEY_CODE_ESC: KEY_CODE_ESC,
    adForm: adForm,
    mapForm: mapForm,
    mapPins: mapPins,
    mapPinMain: mapPinMain,
  };
})();
