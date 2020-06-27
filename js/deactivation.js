'use strict';

(function () {
  var resetButton = document.querySelector('.ad-form__reset');

  var deactivateElement = function (element, className) {
    element.classList.add(className);
  };

  var resetSelectIndex = function (name, index) {
    if (name.selectedIndex !== index) {
      name.selectedIndex = index;
    }
  };

  var resetAdForm = function () {
    var adForm = window.activation.adForm;
    var inputsOfAdForm = adForm.querySelectorAll('#title, #price, #avatar, #images, #description');
    var selectsOfAdForm = adForm.querySelectorAll('#room_number, #timein, #timeout');
    var inputsCheckbox = adForm.querySelectorAll('[type="checkbox"]');

    window.pinMainMove.startCoords();
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

  var deactivationPage = function () {
    pinsRemove();
    window.activation.toggleStateForms();
    deactivateElement(window.cardShow.map, window.activation.NAME_CLASS_MAP);
    deactivateElement(window.activation.adForm, window.activation.NAME_CLASS_AD);
    resetAdForm();
    window.form.mapPinMain.addEventListener('mousedown', window.activation.mapPinMousedownHandler);
    window.form.mapPinMain.addEventListener('keydown', window.activation.mapPinKeydownHandler);
  };

  resetButton.addEventListener('click', deactivationPage);

  window.deactivation = {
    page: deactivationPage
  };
})();
