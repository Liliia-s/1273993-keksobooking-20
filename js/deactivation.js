'use strict';

(function () {
  var LOCATION_MAP_PIN_MAIN_X = 570;
  var LOCATION_MAP_PIN_MAIN_Y = 375;
  var adForm = window.activation.adForm;
  var mapForm = window.activation.mapForm;

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
    window.form.mapPinMain.style.top = LOCATION_MAP_PIN_MAIN_Y + 'px';
    window.form.mapPinMain.style.left = LOCATION_MAP_PIN_MAIN_X + 'px';
    window.form.setAdressMapPinMain(window.activation.MAP_PIN_MAIN_ROUND_HALF_HEIGHT);
  };

  var removeEventListener = function () {
    window.activation.resetButton.removeEventListener('click', deactivatePage);
    window.activation.adForm.removeEventListener('submit', window.formSubmit.handler);
    window.activation.buttonSubmit.removeEventListener('click', window.formValidation.buttonSubmit);
    window.form.mapPinMain.removeEventListener('mousedown', window.pinMainMove.mousedownHandler);
    window.activation.mapPins.removeEventListener('click', window.cardShow.mapPinClickHandler);
    window.form.removeEventListeners();
  };

  var deactivatePage = function () {
    pinsRemove();
    window.activation.toggleStateForms();
    deactivateElement(window.cardShow.map, window.activation.NAME_CLASS_MAP);
    deactivateElement(window.activation.adForm, window.activation.NAME_CLASS_AD);
    adForm.reset();
    mapForm.reset();
    window.form.fieldTypeInputHandler();
    setDefaultLocation();
    window.formValidation.fieldsCheck.forEach(function (element) {
      element.classList.remove('error-field');
    });
    window.cardShow.closePopup();
    window.form.mapPinMain.addEventListener('mousedown', window.activation.mapPinMousedownHandler);
    window.form.mapPinMain.addEventListener('keydown', window.activation.mapPinKeydownHandler);
    removeEventListener();
  };

  window.deactivation = {
    pinsRemove: pinsRemove,
    getInactiveStatePage: deactivatePage
  };
})();
