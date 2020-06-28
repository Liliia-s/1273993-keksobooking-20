'use strict';

(function () {
  window.load = function (successHandler, errorHandler) {

    window.serverRequest.data(successHandler, errorHandler, 'GET', 'https://javascript.pages.academy/keksobooking/data');

    window.serverRequest.xhr().send();
  };
})();
