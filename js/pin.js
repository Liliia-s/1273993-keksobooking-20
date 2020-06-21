'use strict';

(function () {
  var MAP_PIN_HALF_WIDTH = 25;
  var MAP_PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin').content;
  var pinTemplateButton = pinTemplate.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  var createDomElement = function (user, index) {
    var mapPin = pinTemplateButton.cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');

    mapPin.dataset.index = index;
    mapPinImg.src = user.author.avatar;
    mapPinImg.alt = user.offer.title;
    mapPinImg.dataset.index = index;
    mapPin.style.left = user.location.x - MAP_PIN_HALF_WIDTH + 'px';
    mapPin.style.top = user.location.y - MAP_PIN_HEIGHT + 'px';
    return mapPin;
  };

  var createMapPins = function (announcements) {
    for (var i = 0; i < announcements.length; i++) {
      var pin = createDomElement(announcements[i], i);
      fragment.appendChild(pin);
    }
    return fragment;
  };

  window.pin = {
    create: createMapPins
  };
})();
