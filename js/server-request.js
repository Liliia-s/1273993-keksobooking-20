'use strict';

(function () {
  var xhrNew;
  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var requestData = function (successHandler, errorHandler, method, URL) {
    var xhr = new XMLHttpRequest();
    xhrNew = xhr;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case StatusCode.OK:
          successHandler(xhr.response);
          break;

        case StatusCode.BAD_REQUEST:
          error = 'Плохой запрос';
          break;
        case StatusCode.UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case StatusCode.NOT_FOUND:
          error = 'Запрашиваемый ресурс не найден';
          break;
        case StatusCode.SERVER_ERROR:
          error = 'Внутренняя ошибка сервера';
          break;
        default:
          error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        errorHandler(error);
      }
      // if (xhr.status === StatusCode.OK) {
      //   successHandler(xhr.response);
      // } else {
      //   errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      // }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.open(method, URL);
  };

  window.serverRequest = {
    xhr: function () {
      return xhrNew;
    },
    data: requestData,
  };
})();
