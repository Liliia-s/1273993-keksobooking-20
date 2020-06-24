'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';

  window.load = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        successHandler(xhr.response);
      } else {
        errorHandler('Статус ответа: ' + xhr.status + '' + xhr.status);
      }
    });

    xhr.send();
  };
  // window.load = {
  //   getData: getData
  // };

})();
