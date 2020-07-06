'use strict';

(function () {
  var MAX_SIMILAR_PIN_COUNT = 5;
  var VALUE_ANY = 'any';
  var PriceValue = {
    PRICE_MIN: 10000,
    PRICE_MAX: 50000,
    PRICE_VALUE_LOW: 'low',
    PRICE_VALUE_MIDDLE: 'middle',
    PRICE_VALUE_HIGH: 'high'
  };
  var mapForm = window.util.mapForm;
  var mapPins = window.util.mapPins;
  var filterTypeOfHousing = mapForm.querySelector('#housing-type');
  var filterOfPrice = mapForm.querySelector('#housing-price');
  var filterOfRooms = mapForm.querySelector('#housing-rooms');
  var filterOfGuests = mapForm.querySelector('#housing-guests');
  var filterOfFeatures = mapForm.querySelector('#housing-features');
  var announcements;

  var filterType = function (advert) {
    return filterTypeOfHousing.value === advert.offer.type || filterTypeOfHousing.value === VALUE_ANY;
  };

  var filterPrice = function (advert) {
    if (filterOfPrice.value === PriceValue.PRICE_VALUE_LOW) {
      return advert.offer.price < PriceValue.PRICE_MIN;
    } else if (filterOfPrice.value === PriceValue.PRICE_VALUE_MIDDLE) {
      return PriceValue.PRICE_MIN < advert.offer.price < PriceValue.PRICE_MAX;
    } else if (filterOfPrice.value === PriceValue.PRICE_VALUE_HIGH) {
      return advert.offer.price > PriceValue.PRICE_MAX;
    } else {
      return filterOfPrice.value === VALUE_ANY;
    }
  };

  var filterRooms = function (advert) {
    return advert.offer.rooms === parseInt(filterOfRooms.value, 10) || filterOfRooms.value === VALUE_ANY;
  };

  var filterGuests = function (advert) {
    return advert.offer.guests === parseInt(filterOfGuests.value, 10) || filterOfGuests.value === VALUE_ANY;
  };

  var filterFeatures = function (advert) {
    var checkedFeatures = Array.from(filterOfFeatures.querySelectorAll('input[type=checkbox]:checked')).map(function (element) {
      return element.value;
    });

    return checkedFeatures.every(function (element) {
      return advert.offer.features.includes(element);
    });
  };

  var allFilters = [filterType, filterPrice, filterRooms, filterGuests, filterFeatures];

  var getFunctionOfFilter = function (element) {
    return allFilters.every(function (filter) {
      return filter(element);
    });
  };

  var filterAdverts = function (adverts, functionOfFilter) {
    var filterPins = [];
    for (var i = 0; i < adverts.length; i++) {
      if (filterPins.length === MAX_SIMILAR_PIN_COUNT) {
        break;
      } if (functionOfFilter(adverts[i])) {
        filterPins.push(adverts[i]);
      }
    }
    return filterPins;
  };

  var getPins = function () {
    window.cardShow.closePopup();
    window.deactivation.pinsRemove();
    announcements = filterAdverts(window.backend.dataAds, getFunctionOfFilter);
    mapPins.appendChild(window.pin.create(announcements));
  };

  window.filters = {
    getPins: getPins,
    getAllAnnouncements: function () {
      return announcements;
    }
  };
})();
