'use strict';

(function () {
  var MAP_PIN_MAIN_ROUND_HALF_HEIGHT = 31;
  var MAP_PIN_MAIN_HEIGHT = 82;
  var NAME_CLASS_MAP = 'map--faded';
  var NAME_CLASS_AD = 'ad-form--disabled';
  var KEY_CODE_ENTER = 13;
  var KEY_CODE_MOUSE_LEFT = 0;
  var adForm = document.querySelector('.ad-form');
  var elementsOfAdForm = adForm.querySelectorAll('input, select, textarea, button');
  var mapForm = document.querySelector('.map__filters');
  var elementsOfMapForm = mapForm.querySelectorAll('input, select');
  var mapPins = document.querySelector('.map__pins');
  var resetButton = document.querySelector('.ad-form__reset');
  var buttonSubmit = document.querySelector('.ad-form__submit');

  var activateElement = function (element, className) {
    element.classList.remove(className);
  };

  var toggleStateOfElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].toggleAttribute('disabled');
    }
  };

  var toggleStateForms = function () {
    toggleStateOfElements(elementsOfAdForm);
    toggleStateOfElements(elementsOfMapForm);
  };

  toggleStateForms();
  window.form.setAdressMapPinMain(MAP_PIN_MAIN_ROUND_HALF_HEIGHT);

  // ОТСЮДА НАЧИНАЮТСЯ ФИЛЬТРЫ

  var filterTypeOfHousing = mapForm.querySelector('#housing-type');
  var filterOfPrice = mapForm.querySelector('#housing-price');
  var filterOfRooms = mapForm.querySelector('#housing-rooms');
  var filterOfGuests = mapForm.querySelector('#housing-guests');
  var filterOfFeatures = mapForm.querySelector('#housing-features');
  var priceValues = {
    PRICE_MIN: 10000,
    PRICE_MAX: 50000,
    PRICE_VALUE_HIGH: 'high',
    PRICE_VALUE_LOW: 'low',
    PRICE_VALUE_MIDDLE: 'middle'
  };
  var roomValues = {
    ROOM_ONE: 1,
    ROOMS_TWO: 2,
    ROOMS_THREE: 3,
  };
  var guestValues = {
    GUESTS_TWO: 2,
    GUESTS_ONE: 1,
    GUESTS_NULL: 0,
  };
  var MAX_SIMILAR_PIN_COUNT = 5;
  var TYPE_ANY = 'any';
  var allAnnouncements;

  var filterType = function (adverts) {
    var filteredAdsByType = [];
    for (var i = 0; i < adverts.length; i++) {
      if (filteredAdsByType.length === MAX_SIMILAR_PIN_COUNT) {
        break;
      } if (adverts[i].offer.type === filterTypeOfHousing.value || TYPE_ANY === filterTypeOfHousing.value) {
        filteredAdsByType.push(adverts[i]);
      }
    }
    return filteredAdsByType;
  };

  var filterPrice = function (adverts) {
    var filteredAdsByPrice = [];
    for (var i = 0; i < adverts.length; i++) {
      if (filteredAdsByPrice.length === MAX_SIMILAR_PIN_COUNT) {
        break;
      } if (filterOfPrice.value === priceValues.PRICE_VALUE_HIGH && adverts[i].offer.price >= priceValues.PRICE_MAX) {
        filteredAdsByPrice.push(adverts[i]);
      } else if (filterOfPrice.value === priceValues.PRICE_VALUE_LOW && adverts[i].offer.price < priceValues.PRICE_MIN) {
        filteredAdsByPrice.push(adverts[i]);
      } else if (filterOfPrice.value === priceValues.PRICE_VALUE_MIDDLE && (priceValues.PRICE_MIN <= adverts[i].offer.price && adverts[i].offer.price < priceValues.PRICE_MAX)) {
        filteredAdsByPrice.push(adverts[i]);
      } else if (TYPE_ANY === filterOfPrice.value) {
        filteredAdsByPrice.push(adverts[i]);
      }
    }
    return filteredAdsByPrice;
  };

  var filterRooms = function (adverts) {
    var filteredAdsByRooms = [];
    for (var i = 0; i < adverts.length; i++) {
      if (filteredAdsByRooms.length === MAX_SIMILAR_PIN_COUNT) {
        break;
      } if ((parseInt(filterOfRooms.value, 10) === roomValues.ROOM_ONE) && (adverts[i].offer.rooms === roomValues.ROOM_ONE)) {
        filteredAdsByRooms.push(adverts[i]);
      } else if ((parseInt(filterOfRooms.value, 10) === roomValues.ROOMS_TWO) && (adverts[i].offer.rooms) === roomValues.ROOMS_TWO) {
        filteredAdsByRooms.push(adverts[i]);
      } else if ((parseInt(filterOfRooms.value, 10) === roomValues.ROOMS_THREE) && (adverts[i].offer.rooms === roomValues.ROOMS_THREE)) {
        filteredAdsByRooms.push(adverts[i]);
      } else if (TYPE_ANY === filterOfRooms.value) {
        filteredAdsByRooms.push(adverts[i]);
      }
    }
    return filteredAdsByRooms;
  };

  var filterGuests = function (adverts) {
    var filteredAdsByGuests = [];
    for (var i = 0; i < adverts.length; i++) {
      if (filteredAdsByGuests.length === MAX_SIMILAR_PIN_COUNT) {
        break;
      } if ((parseInt(filterOfGuests.value, 10) === guestValues.GUESTS_TWO) && (adverts[i].offer.guests === guestValues.GUESTS_TWO)) {
        filteredAdsByGuests.push(adverts[i]);
      } else if ((parseInt(filterOfGuests.value, 10) === guestValues.GUESTS_ONE) && (adverts[i].offer.guests === guestValues.GUESTS_ONE)) {
        filteredAdsByGuests.push(adverts[i]);
      } else if ((parseInt(filterOfGuests.value, 10) === guestValues.GUESTS_NULL) && (adverts[i].offer.guests === guestValues.GUESTS_NULL)) {
        filteredAdsByGuests.push(adverts[i]);
      } else if (TYPE_ANY === filterOfGuests.value) {
        filteredAdsByGuests.push(adverts[i]);
      }
    }
    return filteredAdsByGuests;
  };

  var filterFeatures = function (adverts) {
    var filteredAdsByFeatures = [];
    var checkedFeatures = Array.from(filterOfFeatures.querySelectorAll('input[type=checkbox]:checked')).map(function (element) {
      return element.value;
    });

    var getFeatures = function (advert) {
      return checkedFeatures.every(function (element) {
        return advert.offer.features.includes(element);
      });
    };

    for (var i = 0; i < adverts.length; i++) {
      if (filteredAdsByFeatures.length === MAX_SIMILAR_PIN_COUNT) {
        break;
      } if (getFeatures(adverts[i])) {
        filteredAdsByFeatures.push(adverts[i]);
      }
    }
    return filteredAdsByFeatures;
  };

  // var allFilters = [filterType, filterPrice, filterRooms, filterGuests, filterFeatures];

  // var getFunctionOfFilter = function (element) {
  //   return allFilters.every(function (filter) {
  //     return filter(element);
  //   });
  // };

  var successHandler = function (adverts) {
    var announcements = adverts;
    allAnnouncements = announcements;
    mapPins.appendChild(window.pin.create(allAnnouncements.slice(0, MAX_SIMILAR_PIN_COUNT)));

    var filterInputHandler = function () {
      // сюда подставляется нужная функция для проверки нужного фильтра
      var getPins = filterGuests(announcements);
      allAnnouncements = getPins;
      window.cardShow.closePopup();
      window.deactivation.pinsRemove();
      mapPins.appendChild(window.pin.create(allAnnouncements));
    };

    toggleStateOfElements(elementsOfMapForm);
    // mapForm.addEventListener('change', filterInputHandler);
    filterTypeOfHousing.addEventListener('input', filterInputHandler);
    filterOfPrice.addEventListener('input', filterInputHandler);
    filterOfRooms.addEventListener('input', filterInputHandler);
    filterOfGuests.addEventListener('input', filterInputHandler);
    filterOfFeatures.addEventListener('input', filterInputHandler);
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

  var setActiveStateListeners = function () {
    window.form.mapPinMain.removeEventListener('mousedown', mapPinMousedownHandler);
    window.form.mapPinMain.removeEventListener('keydown', mapPinKeydownHandler);
    window.form.addEventListeners();
    mapPins.addEventListener('click', window.cardShow.mapPinClickHandler);
    adForm.addEventListener('submit', window.formSubmit.handler);
    resetButton.addEventListener('click', window.deactivation.getInactiveStatePage);
    buttonSubmit.addEventListener('click', window.formValidation.buttonSubmit);
  };

  var activateStatePage = function () {
    activateElement(window.cardShow.map, NAME_CLASS_MAP);
    activateElement(adForm, NAME_CLASS_AD);
    toggleStateOfElements(elementsOfAdForm);
    window.backend.loadData(successHandler, errorHandler);
    // mapPins.appendChild(window.pin.create(window.dataCreate.allAnnouncements));
    window.form.setAdressMapPinMain(MAP_PIN_MAIN_HEIGHT);
    setActiveStateListeners();
  };

  var mapPinMousedownHandler = function (evt) {
    if (evt.button === KEY_CODE_MOUSE_LEFT) {
      evt.preventDefault();
      activateStatePage();
    }
  };

  var mapPinKeydownHandler = function (evt) {
    if (evt.keyCode === KEY_CODE_ENTER) {
      evt.preventDefault();
      activateStatePage();
    }
  };

  window.form.mapPinMain.addEventListener('mousedown', mapPinMousedownHandler);
  window.form.mapPinMain.addEventListener('keydown', mapPinKeydownHandler);

  window.activation = {
    NAME_CLASS_MAP: NAME_CLASS_MAP,
    NAME_CLASS_AD: NAME_CLASS_AD,
    MAP_PIN_MAIN_ROUND_HALF_HEIGHT: MAP_PIN_MAIN_ROUND_HALF_HEIGHT,
    MAP_PIN_MAIN_HEIGHT: MAP_PIN_MAIN_HEIGHT,
    mapForm: mapForm,
    adForm: adForm,
    mapPins: mapPins,
    resetButton: resetButton,
    buttonSubmit: buttonSubmit,
    mapPinMousedownHandler: mapPinMousedownHandler,
    mapPinKeydownHandler: mapPinKeydownHandler,
    toggleStateForms: toggleStateForms,
    getAllAnnouncements: function () {
      return allAnnouncements;
    },
  };
})();
