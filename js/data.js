'use strict';

(function () {
  var allAnnouncements;

  var successHandler = function (adverts) {
    var announcements = adverts;
    allAnnouncements = announcements;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; color: white; font-weight: bold; background-color: orange;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '35px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);

  window.data = {
    getallAnnouncements: function () {
      return allAnnouncements;
    },
    errorHandler: errorHandler
  };
})();
