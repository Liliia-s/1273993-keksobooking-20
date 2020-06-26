'use strict';

(function () {
  var fieldsCheck = document.querySelectorAll('input, select');
  var buttonSubmit = document.querySelector('.ad-form__submit');

  var buttonSubmitClickHandler = function () {
    fieldsCheck.forEach(function (element) {
      if (!element.checkValidity()) {
        element.classList.add('error-field');
      } else {
        element.classList.remove('error-field');
      }
    });
  };

  buttonSubmit.addEventListener('click', buttonSubmitClickHandler);

  var successHandler = function () {
    console.log('successHandler работает');
    var successTemplate = document.querySelector('#success').content;
    var successBlock = successTemplate.querySelector('.success');
    var successMessage = successBlock.cloneNode(true);
    document.querySelector('main').insertAdjacentElement('afterbegin', successMessage);
  };

  // var popupKeydownEscHandler = function (evt) {
  //   if (evt.keyCode === KEY_CODE_ESC) {
  //     evt.preventDefault();
  //     closePopup();
  //   }
  // };

  // var buttonCloseClickHandler = function (evt) {
  //   evt.preventDefault();
  //   closePopup();
  // };

  var errorBlock = document.querySelector('.error');

  var errorButtonClickHandler = function (evt) {
    evt.preventDefault();
    closeErrorMessage();
  };

  var documentKeydownHandler = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.cardShow.KEY_CODE_ESC) {
      closeErrorMessage();
    }
  };

  var documentClickHandler = function (evt) {
    evt.preventDefault();
    closeErrorMessage();
  };

  var closeErrorMessage = function () {
    errorBlock.remove();
    errorButton.removeEventListener('click', errorButtonClickHandler);
    document.removeEventListener('keydown', documentKeydownHandler);
    document.removeEventListener('click', documentClickHandler);
  };

  var errorHandler = function () {
    console.log('errorHandler работает');
    var errorTemplate = document.querySelector('#error').content;
    var errorBlockTemplate = errorTemplate.querySelector('.error');
    var errorMessage = errorBlockTemplate.cloneNode(true);
    var errorButton = document.querySelector('.error__button');
    document.querySelector('main').insertAdjacentElement('afterbegin', errorMessage);

    errorButton.addEventListener('click', errorButtonClickHandler);
    document.addEventListener('keydown', documentKeydownHandler);
    document.addEventListener('click', documentClickHandler);
  };

  var adForm = document.querySelector('.ad-form');

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(adForm), successHandler, errorHandler);
    console.log('submit работает');
  });
})();
