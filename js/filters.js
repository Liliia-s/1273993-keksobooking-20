// 'use strict';

// (function () {
//   var MAX_SIMILAR_PIN_COUNT = 5;
//   var TYPE_ANY = 'any';
//   var filterTypeOfHousing = mapForm.querySelector('#housing-type');
//   var allAnnouncements;

//   var filterPins = function (adverts) {
//     var filterTypes = function (advert) {
//       return advert.offer.type === filterTypeOfHousing.value || TYPE_ANY === filterTypeOfHousing.value;
//     };
//     var sortPins = adverts.filter(filterTypes).slice(0, MAX_SIMILAR_PIN_COUNT);
//     allAnnouncements = sortPins;
//     window.cardShow.closePopup();
//     window.deactivation.pinsRemove();
//     mapPins.appendChild(window.pin.create(sortPins));
//   };

//   window.filters = {
//     MAX_SIMILAR_PIN_COUNT: MAX_SIMILAR_PIN_COUNT,
//     getPins: filterPins,
//     getAllAnnouncements: function () {
//       return allAnnouncements;
//     }
//   };
// })();
