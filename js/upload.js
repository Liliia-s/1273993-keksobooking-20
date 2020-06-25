'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';

  window.upload = function (data, successHandler) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      successHandler(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
