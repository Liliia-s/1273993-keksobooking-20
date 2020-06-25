'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var StatusCode = {
    OK: 200
  };
  window.load = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        successHandler(xhr.response);
      } else {
        errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.open('GET', URL);
    xhr.send();
  };
})();
