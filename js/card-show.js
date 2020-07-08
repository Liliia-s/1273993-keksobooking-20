'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');

  var popupKeydownEscHandler = function (evt) {
    if (evt.keyCode === window.util.KEY_CODE_ESC) {
      evt.preventDefault();
      closePopup();
      removeMapPinActive();
    }
  };

  var buttonCloseClickHandler = function (evt) {
    evt.preventDefault();
    closePopup();
    removeMapPinActive();
  };

  var removeMapPinActive = function () {
    var mapPinActive = map.querySelector('.map__pin--active');
    if (mapPinActive) {
      mapPinActive.classList.remove('map__pin--active');
    }
  };

  var mapPinClickHandler = function (evt) {
    if (evt.target.matches('.map__pin:not(.map__pin--main), img[data-index]')) {
      removeMapPinActive();
      if (evt.target.matches('.map__pin:not(.map__pin--main)')) {
        evt.target.classList.add('map__pin--active');
      } else if (evt.target.matches('img[data-index]')) {
        evt.target.parentElement.classList.add('map__pin--active');
      }

      var indexPin = evt.target.dataset.index;
      closePopup();
      var card = window.card.create(window.filters.getAllAnnouncements()[indexPin]);
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
    map: map,
    mapFilters: mapFilters,
    closePopup: closePopup,
    mapPinClickHandler: mapPinClickHandler
  };
})();
