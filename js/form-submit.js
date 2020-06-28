'use strict';

(function () {
  var main = document.querySelector('main');

  var createMessage = function (tagName, className) {
    var messageTemplate = document.querySelector(tagName).content;
    var messageBlockTemplate = messageTemplate.querySelector(className);
    var message = messageBlockTemplate.cloneNode(true);
    main.insertAdjacentElement('afterbegin', message);
  };

  var successHandler = function () {
    createMessage('#success', '.success');
    window.deactivation.getInactiveStatePage();

    document.addEventListener('click', documentClickHandler);
    document.addEventListener('keydown', documentKeydownHandler);
  };

  var errorHandler = function () {
    createMessage('#error', '.error');
    var errorButton = document.querySelector('.error__button');

    errorButton.addEventListener('click', errorButtonClickHandler);
    document.addEventListener('keydown', documentKeydownHandler);
    document.addEventListener('click', documentClickHandler);
  };

  var errorButtonClickHandler = function (evt) {
    evt.preventDefault();
    closeMessage();
  };

  var documentKeydownHandler = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.cardShow.KEY_CODE_ESC) {
      closeMessage();
    }
  };

  var documentClickHandler = function (evt) {
    evt.preventDefault();
    closeMessage();
  };

  var closeMessage = function () {
    var errorMessage = document.querySelector('.error');
    var successMessage = document.querySelector('.success');

    if (successMessage) {
      successMessage.remove();
    } else {
      errorMessage.remove();
    }

    document.removeEventListener('keydown', documentKeydownHandler);
    document.removeEventListener('click', documentClickHandler);
  };

  var adForm = document.querySelector('.ad-form');

  var adFormSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.uploadData(new FormData(adForm), successHandler, errorHandler);
  };

  window.formSubmit = {
    handler: adFormSubmitHandler
  };
})();
