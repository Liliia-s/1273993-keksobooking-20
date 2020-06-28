'use strict';

(function () {
  window.upload = function (data, successHandler, errorHandler) {

    window.serverRequest.data(successHandler, errorHandler, 'POST', 'https://javascript.pages.academy/keksobooking');

    window.serverRequest.xhr().send(data);
  };
})();
