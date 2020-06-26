'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 201
  };

  window.upload = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    // xhr.addEventListener('load', function () {
    //   successHandler(xhr.response);
    // });

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        successHandler(xhr.response);
      } else {
        errorHandler();
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
