'use strict';

(function () {
  var LOCATION_MAP_PIN_MAIN_X = 570;
  var LOCATION_MAP_PIN_MAIN_Y = 375;
  var adForm = window.activation.adForm;
  // var inputsOfAdForm = adForm.querySelectorAll('#title, #price, #avatar, #images, #description');
  // var selectsOfAdForm = adForm.querySelectorAll('#room_number, #timein, #timeout');
  // var inputsCheckbox = adForm.querySelectorAll('[type="checkbox"]');

  var deactivateElement = function (element, className) {
    element.classList.add(className);
  };

  // var resetSelectIndex = function (name, index) {
  //   if (name.selectedIndex !== index) {
  //     name.selectedIndex = index;
  //   }
  // };

  // var resetAdForm = function () {
  //   inputsOfAdForm.forEach(function (element) {
  //     element.value = '';
  //   });

  //   inputsCheckbox.forEach(function (element) {
  //     element.checked = false;
  //   });

  //   selectsOfAdForm.forEach(function (element) {
  //     resetSelectIndex(element, 0);
  //   });

  //   resetSelectIndex(window.form.fieldType, 1);
  //   window.form.fieldTypeInputHandler();
  //   resetSelectIndex(window.form.fieldGuests, 2);
  // };

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
    page: deactivatePage
  };
})();
