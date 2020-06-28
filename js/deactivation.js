'use strict';

(function () {

  var deactivateElement = function (element, className) {
    element.classList.add(className);
  };

  var resetSelectIndex = function (name, index) {
    if (name.selectedIndex !== index) {
      name.selectedIndex = index;
    }
  };

  var resetAdForm = function () {
    var LOCATION_MAP_PIN_MAIN_X = 570;
    var LOCATION_MAP_PIN_MAIN_Y = 375;
    var adForm = window.activation.adForm;
    var inputsOfAdForm = adForm.querySelectorAll('#title, #price, #avatar, #images, #description');
    var selectsOfAdForm = adForm.querySelectorAll('#room_number, #timein, #timeout');
    var inputsCheckbox = adForm.querySelectorAll('[type="checkbox"]');

    window.form.mapPinMain.style.top = LOCATION_MAP_PIN_MAIN_Y + 'px';
    window.form.mapPinMain.style.left = LOCATION_MAP_PIN_MAIN_X + 'px';
    window.form.setAdressMapPinMain(window.activation.MAP_PIN_MAIN_ROUND_HALF_HEIGHT);
    inputsOfAdForm.forEach(function (element) {
      element.value = '';
    });

    inputsCheckbox.forEach(function (element) {
      element.checked = false;
    });

    selectsOfAdForm.forEach(function (element) {
      resetSelectIndex(element, 0);
    });

    resetSelectIndex(window.form.fieldType, 1);
    window.form.fieldTypeInputHandler();
    resetSelectIndex(window.form.fieldGuests, 2);
  };

  var pinsRemove = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main');
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].remove();
    }
  };

  var removeEventListener = function () {
    window.activation.resetButton.removeEventListener('click', deactivationPage);
    window.activation.adForm.removeEventListener('submit', window.formSubmit.handler);
    window.activation.buttonSubmit.removeEventListener('click', window.formValidation.buttonSubmit);
    window.form.mapPinMain.removeEventListener('mousedown', window.pinMainMove.mousedownHandler);
    window.activation.mapPins.removeEventListener('click', window.cardShow.mapPinClickHandler);
    window.form.inputTitle.removeEventListener('input', window.form.inputTitleHandler);
    window.form.fieldType.removeEventListener('input', window.form.fieldTypeInputHandler);
    window.form.fieldTimein.removeEventListener('input', window.form.fieldTimeinInputHandler);
    window.form.fieldTimeout.removeEventListener('input', window.form.fieldTimeoutInputHandler);
    window.form.fieldRooms.removeEventListener('input', window.form.fieldRoomsInputHandler);
    window.form.fieldGuests.removeEventListener('input', window.form.fieldGuestsInputHandler);
  };

  var deactivationPage = function () {
    pinsRemove();
    window.activation.toggleStateForms();
    deactivateElement(window.cardShow.map, window.activation.NAME_CLASS_MAP);
    deactivateElement(window.activation.adForm, window.activation.NAME_CLASS_AD);
    resetAdForm();
    window.formValidation.fieldsCheck.forEach(function (element) {
      element.classList.remove('error-field');
    });
    window.cardShow.closePopup();
    window.form.mapPinMain.addEventListener('mousedown', window.activation.mapPinMousedownHandler);
    window.form.mapPinMain.addEventListener('keydown', window.activation.mapPinKeydownHandler);
    removeEventListener();
  };

  window.deactivation = {
    page: deactivationPage
  };
})();
