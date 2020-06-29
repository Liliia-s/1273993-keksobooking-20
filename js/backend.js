'use strict';

(function () {
  var METHOD_GET = 'GET';
  var METHOD_POST = 'POST';
  var URL_FOR_GET = 'https://javascript.pages.academy/keksobooking/data';
  var URL_FOR_POST = 'https://javascript.pages.academy/keksobooking';

  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var requestData = function (successHandler, errorHandler, method, url) {
    var xhr = new XMLHttpRequest();
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
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.open(method, url);
    return xhr;
  };

  var loadData = function (successHandler, errorHandler) {
    requestData(successHandler, errorHandler, METHOD_GET, URL_FOR_GET).send();
  };

  var uploadData = function (data, successHandler, errorHandler) {
    requestData(successHandler, errorHandler, METHOD_POST, URL_FOR_POST).send(data);
  };

  window.backend = {
    loadData: loadData,
    uploadData: uploadData
  };
})();
