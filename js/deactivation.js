'use strict';

(function () {
  var LOCATION_MAP_PIN_MAIN_X = 570;
  var LOCATION_MAP_PIN_MAIN_Y = 375;
  var NAME_CLASS_PHOTO = '.ad-form__photo:not(.ad-form__photo--template)';
  var DEFAULT_SRC = 'img/muffin-grey.svg';
  var adForm = window.util.adForm;
  var mapForm = window.util.mapForm;
  var mapPinMain = window.util.mapPinMain;

  var setDefaultLocation = function () {
    mapPinMain.style.top = LOCATION_MAP_PIN_MAIN_Y + 'px';
    mapPinMain.style.left = LOCATION_MAP_PIN_MAIN_X + 'px';
  };

  var removeEventListener = function () {
    mapForm.removeEventListener('change', window.activation.getFilterInputHandler());
    window.activation.resetButton.removeEventListener('click', deactivatePage);
    adForm.removeEventListener('submit', window.formSubmit.handler);
    window.activation.buttonSubmit.removeEventListener('click', window.formValidation.buttonSubmit);
    window.util.mapPins.removeEventListener('click', window.cardShow.mapPinClickHandler);
    window.files.chooserAvatar.removeEventListener('change', window.files.loadAvatar);
    window.files.chooserHousing.removeEventListener('change', window.files.loadPhotoOfhousing);
    window.form.removeEventListeners();
  };

  var resetAvatar = function () {
    window.files.previewAvatar.src = DEFAULT_SRC;
  };

  var deactivatePage = function () {
    window.util.elementsRemove(window.util.NAME_CLASS_PIN);
    adForm.reset();
    mapForm.reset();
    window.activation.setInitialStates();
    window.util.toggleActiveElement(window.cardShow.map, window.activation.NAME_CLASS_MAP);
    window.util.toggleActiveElement(adForm, window.activation.NAME_CLASS_AD);
    resetAvatar();
    window.files.previewPhotoOfHousing.classList.remove(window.util.NAME_CLASS_HIDDEN);
    window.util.elementsRemove(NAME_CLASS_PHOTO);
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
    getInactiveStatePage: deactivatePage
  };
})();
