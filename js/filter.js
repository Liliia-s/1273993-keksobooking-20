// 'use strict';

// (function () {
//   var MAX_SIMILAR_PIN_COUNT = 5;
//   var TYPE_ANY = 'any';
//   var filterTypeOfHousing = document.querySelector('#housing-type');
//   var mapPins = document.querySelector('.map__pins');
//   // mapPins уже есть в activation
//   var allAnnouncements;

//   var filterTypes = function (advert) {
//     var filteredAdsByType = [];
//     for (var i = 0; i < advert.length; i++) {
//       if (advert[i].offer.type === filterTypeOfHousing.value || TYPE_ANY === filterTypeOfHousing.value && filteredAdsByType.length !== MAX_SIMILAR_PIN_COUNT) {
//         filteredAdsByType.push(advert[i]);
//       }
//     }
//     return filteredAdsByType;
//   };

//   var getFiveFirstAnnouncements = function (adverts) {
//     allAnnouncements = filterTypes(adverts);
//     mapPins.appendChild(window.pin.create(allAnnouncements));
//   };

//   var filterTypeInputHandler = function () {
//     var filterPins = filterTypes(announcements);
//     allAnnouncements = filterPins;
//     window.cardShow.closePopup();
//     window.deactivation.pinsRemove();
//     mapPins.appendChild(window.pin.create(filterPins));
//   };

//   window.filter = {
//     typeOfHousing: filterTypeOfHousing,
//     getTypes: filterTypes,
//     setTypeHandler: filterTypeInputHandler,
//     getFiveFirstAnnouncements: getFiveFirstAnnouncements,
//     getAllAnnouncements: function () {
//       return allAnnouncements;
//     },

//   };
// })();
