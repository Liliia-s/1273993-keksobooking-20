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
})();
