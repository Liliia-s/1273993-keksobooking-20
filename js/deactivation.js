'use strict';

(function () {
  var LOCATION_MAP_PIN_MAIN_X = 570;
  var LOCATION_MAP_PIN_MAIN_Y = 375;
  var adForm = window.util.adForm;
  var mapForm = window.util.mapForm;
  var mapPinMain = window.util.mapPinMain;
  var deactivateElement = function (element, className) {
    element.classList.add(className);
  };

  var pinsRemove = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main');
    mapPins.forEach(function (element) {
      element.remove();
    });
  };

  var setDefaultLocation = function () {
    mapPinMain.style.top = LOCATION_MAP_PIN_MAIN_Y + 'px';
    mapPinMain.style.left = LOCATION_MAP_PIN_MAIN_X + 'px';
    window.form.setAdressMapPinMain(window.activation.MAP_PIN_MAIN_ROUND_HALF_HEIGHT);
  };

  var removeEventListener = function () {
    // filterTypeOfHousing.addEventListener('input', filterTypeInputHandler);
    window.activation.resetButton.removeEventListener('click', deactivatePage);
    adForm.removeEventListener('submit', window.formSubmit.handler);
    window.activation.buttonSubmit.removeEventListener('click', window.formValidation.buttonSubmit);
    mapPinMain.removeEventListener('mousedown', window.pinMainMove.mousedownHandler);
    window.util.mapPins.removeEventListener('click', window.cardShow.mapPinClickHandler);
    window.form.removeEventListeners();
  };

  var deactivatePage = function () {
    pinsRemove();
    window.activation.toggleStateForms();
    deactivateElement(window.cardShow.map, window.activation.NAME_CLASS_MAP);
    deactivateElement(adForm, window.activation.NAME_CLASS_AD);
    adForm.reset();
    mapForm.reset();
    window.form.fieldTypeInputHandler();
    setDefaultLocation();
    window.formValidation.fieldsCheck.forEach(function (element) {
      element.classList.remove('error-field');
    });
    window.cardShow.closePopup();
    mapPinMain.addEventListener('mousedown', window.activation.mapPinMousedownHandler);
    mapPinMain.addEventListener('keydown', window.activation.mapPinKeydownHandler);
    removeEventListener();
  };

  window.deactivation = {
    pinsRemove: pinsRemove,
    getInactiveStatePage: deactivatePage
  };
})();
