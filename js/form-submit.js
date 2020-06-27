'use strict';

(function () {
  var fieldsCheck = document.querySelectorAll('input, select');
  var buttonSubmit = document.querySelector('.ad-form__submit');

  var buttonSubmitClickHandler = function () {
    fieldsCheck.forEach(function (element) {
      if (!element.checkValidity()) {
        element.classNameList.add('error-field');
      } else {
        element.classNameList.remove('error-field');
      }
    });
  };

  buttonSubmit.addEventListener('click', buttonSubmitClickHandler);

  var createMessage = function (tagName, className) {
    var messageTemplate = document.querySelector(tagName).content;
    var messageBlockTemplate = messageTemplate.querySelector(className);
    var message = messageBlockTemplate.cloneNode(true);
    document.querySelector('main').insertAdjacentElement('afterbegin', message);
  };

  var successHandler = function () {
    console.log('successHandler работает');
    createMessage('#success', '.success');
    window.deactivation.page();
    document.addEventListener('click', documentClickHandler);
    document.addEventListener('keydown', documentKeydownHandler);
  };

  var errorHandler = function () {
    console.log('errorHandler работает');
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
    var messageBlock = document.querySelector('.error') || document.querySelector('.success');
    messageBlock.remove();

    document.removeEventListener('keydown', documentKeydownHandler);
    document.removeEventListener('click', documentClickHandler);
  };

  var adForm = document.querySelector('.ad-form');

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(adForm), successHandler, errorHandler);
    console.log('submit работает');
  });
})();
