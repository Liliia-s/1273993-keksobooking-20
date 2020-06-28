'use strict';

(function () {
  var xhrNew;
  var StatusCode = {
    OK: 200
  };

  var requestData = function (successHandler, errorHandler, method, URL) {
    var xhr = new XMLHttpRequest();
    xhrNew = xhr;
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

    xhr.open(method, URL);
  };

  window.serverRequest = {
    xhr: function () {
      return xhrNew;
    },
    data: requestData,
  };
})();
