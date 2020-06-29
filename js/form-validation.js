'use strict';

(function () {
  var fieldsCheck = document.querySelectorAll('input, select');

  var buttonSubmitClickHandler = function () {
    fieldsCheck.forEach(function (element) {
      if (!element.checkValidity()) {
        element.classList.add('error-field');
      } else {
        element.classList.remove('error-field');
      }
    });
  };

  window.formValidation = {
    fieldsCheck: fieldsCheck,
    buttonSubmit: buttonSubmitClickHandler
  };
})();
