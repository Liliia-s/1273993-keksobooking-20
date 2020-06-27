'use strict';

(function () {
  var resetButton = document.querySelector('.ad-form__reset');

  var deactivateElement = function (element, className) {
    element.classList.add(className);
  };

  var resetAdForm = function () {

  };

  var pinsRemove = function () {
    // if ('.map-pin:not(.map__pin--main')
    var mapPins = document.querySelectorAll('.map-pin:not(.map__pin--main');
    for (var i = 0; i < window.activationPage.getAllAnnouncements().length; i++) {
      mapPins.remove();
    }
  };

  var deactivationPage = function () {
    pinsRemove();
    window.activationPage.toggleStateForms();
    deactivateElement(window.cardShow.map, window.activationPage.NAME_CLASS_MAP);
    deactivateElement(window.activationPage.adForm, window.activationPage.NAME_CLASS_AD);
    resetAdForm();
  };

  resetButton.addEventListener('click', deactivationPage);

  window.deactivation = {
    page: deactivationPage
  };
})();
