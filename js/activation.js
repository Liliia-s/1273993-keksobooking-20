'use strict';

(function () {
  var MAP_PIN_MAIN_ROUND_HALF_HEIGHT = 31;
  var MAP_PIN_MAIN_HEIGHT = 82;
  var NAME_CLASS_MAP = 'map--faded';
  var NAME_CLASS_AD = 'ad-form--disabled';
  var KEY_CODE_ENTER = 13;
  var KEY_CODE_MOUSE_LEFT = 0;
  var MAX_SIMILAR_PIN_COUNT = 5;
  var TYPE_ANY = 'any';
  var adForm = document.querySelector('.ad-form');
  var elementsOfAdForm = adForm.querySelectorAll('input, select, textarea, button');
  var mapForm = document.querySelector('.map__filters');
  var elementsOfMapForm = mapForm.querySelectorAll('input, select');
  var mapPins = document.querySelector('.map__pins');
  var resetButton = document.querySelector('.ad-form__reset');
  var buttonSubmit = document.querySelector('.ad-form__submit');
  var filterTypeOfHousing = mapForm.querySelector('#housing-type');
  var allAnnouncements;

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

  var filterType = function (adverts) {
    var filteredAdsByType = [];
    for (var i = 0; i < adverts.length; i++) {
      if (adverts[i].offer.type === filterTypeOfHousing.value || TYPE_ANY === filterTypeOfHousing.value) {
        filteredAdsByType.push(adverts[i]);
      } if (filteredAdsByType.length === MAX_SIMILAR_PIN_COUNT) {
        break;
      }
    }
    return filteredAdsByType;
  };

  var filterTypeOfPrice = mapForm.querySelector('#housing-price');
  var PRICE_MIN = 10000;
  var PRICE_MAX = 50000;
  // var prices = {
  //   middle: 10000,
  //   low: 10000,
  //   high: 50000
  // };
  var filterPrice = function (adverts) {
    var filteredAdsByPrice = [];
    for (var i = 0; i < adverts.length; i++) {
      console.log('номер i = ' + i);
      if (filterTypeOfPrice.value === 'high' && adverts[i].offer.price >= PRICE_MAX) {
        filteredAdsByPrice.push(adverts[i]);
      } else if (filterTypeOfPrice.value === 'low' && adverts[i].offer.price < PRICE_MIN) {
        filteredAdsByPrice.push(adverts[i]);
      } else if (filterTypeOfPrice.value === 'middle' && (PRICE_MIN <= adverts[i].offer.price && adverts[i].offer.price < PRICE_MAX)) {
        filteredAdsByPrice.push(adverts[i]);
      } else if (filterTypeOfPrice.value === TYPE_ANY) {
        filteredAdsByPrice.push(adverts[i]);
      } if (filteredAdsByPrice.length === MAX_SIMILAR_PIN_COUNT) {
        break;
      }
      // else if (prices[filterTypeOfPrice.value] && adverts[i].offer.price >= prices.high) {
      //   filteredAdsByPrice.push(adverts[i]);
      // } else if (prices[filterTypeOfPrice.value] && prices.middle <= adverts[i].offer.price >= prices.high) {
      //   filteredAdsByPrice.push(adverts[i]);
      // }
      // if (PRICE_MIN < adverts[i].offer.price < PRICE_MAX) {
      //   filteredAdsByPrice.push(adverts[i]);
      // } else if (adverts[i].offer.price > PRICE_MAX) {
      //   filteredAdsByPrice.push(adverts[i]);
      // } else if (adverts[i].offer.price < PRICE_MIN) {
      //   filteredAdsByPrice.push(adverts[i]);
      // }
    }
    return filteredAdsByPrice;
  };


  var successHandler = function (adverts) {
    var announcements = adverts;
    allAnnouncements = announcements;
    mapPins.appendChild(window.pin.create(allAnnouncements.slice(0, MAX_SIMILAR_PIN_COUNT)));
    var filterTypeInputHandler = function () {
      // var filterPins = filterType(announcements);
      var filterPins = filterPrice(announcements);
      allAnnouncements = filterPins;
      window.cardShow.closePopup();
      window.deactivation.pinsRemove();
      mapPins.appendChild(window.pin.create(allAnnouncements));
    };
    toggleStateOfElements(elementsOfMapForm);
    filterTypeOfHousing.addEventListener('input', filterTypeInputHandler);
    filterTypeOfPrice.addEventListener('input', filterTypeInputHandler);
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
