'use strict';

(function () {
  var KEY_CODE_ESC = 27;
  var mapFilters = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');

  var popupKeydownEscHandler = function (evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      evt.preventDefault();
      closePopup();
    }
  };

  var buttonCloseClickHandler = function (evt) {
    evt.preventDefault();
    closePopup();
  };

  var mapPinClickHandler = function (evt) {
    if (evt.target.matches('.map__pin:not(.map__pin--main), img[data-index]')) {
      var indexPin = evt.target.dataset.index;
      closePopup();
      var card = window.card.create(window.activation.getAllAnnouncements()[indexPin]);
      map.insertBefore(card, mapFilters);
      var buttonClosePopup = card.querySelector('.popup__close');
      buttonClosePopup.addEventListener('click', buttonCloseClickHandler);
      document.addEventListener('keydown', popupKeydownEscHandler);
    }
  };

  var closePopup = function () {
    var popup = map.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
    document.removeEventListener('keydown', popupKeydownEscHandler);
  };

  window.cardShow = {
    KEY_CODE_ESC: KEY_CODE_ESC,
    map: map,
    mapFilters: mapFilters,
    mapPinClickHandler: mapPinClickHandler
  };
})();
