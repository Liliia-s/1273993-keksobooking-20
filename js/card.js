'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content;
  var cardTemplateArticle = cardTemplate.querySelector('.map__card');

  var getCardFeatures = function (user, card) {
    var cardFeatures = card.querySelector('.popup__features');
    cardFeatures.innerHTML = '';

    if (user.offer.features.length !== 0) {
      for (var i = 0; i < user.offer.features.length; i++) {
        var popupFeature = document.createElement('li');
        popupFeature.classList.add('popup__feature', 'popup__feature--' + user.offer.features[i]);
        cardFeatures.appendChild(popupFeature);
      }
    } else {
      cardFeatures.classList.add('hidden');
    }
  };

  var getCardPhotos = function (user, card) {
    var cardPhotos = card.querySelector('.popup__photos');
    var cardPhotoTemplate = cardPhotos.querySelector('.popup__photo');
    cardPhotoTemplate.remove();

    if (user.offer.photos.length !== 0) {
      for (var j = 0; j < user.offer.photos.length; j++) {
        var cardPhoto = cardPhotoTemplate.cloneNode(true);
        cardPhoto.src = user.offer.photos[j];
        cardPhotos.appendChild(cardPhoto);
      }
    } else {
      cardPhotos.classList.add('hidden');
    }
  };

  var types = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };

  var createCardOfAnnouncements = function (user) {
    var card = cardTemplateArticle.cloneNode(true);
    var cardAvatar = card.querySelector('.popup__avatar');
    var cardTitle = card.querySelector('.popup__title');
    var cardAdress = card.querySelector('.popup__text--address');
    var cardPrice = card.querySelector('.popup__text--price');
    var cardType = card.querySelector('.popup__type');
    var cardRoomsAndGuests = card.querySelector('.popup__text--capacity');
    var cardTimeInAndOut = card.querySelector('.popup__text--time');
    var cardDescription = card.querySelector('.popup__description');

    if (user.author.avatar) {
      cardAvatar.src = user.author.avatar;
    } else {
      cardAvatar.classList.add('hidden');
    }

    cardTitle.textContent = user.offer.title;
    cardAdress.textContent = user.offer.address;
    cardPrice.textContent = user.offer.price + ' ₽/ночь';
    cardType.textContent = types[user.offer.type];
    cardRoomsAndGuests.textContent = user.offer.rooms + ' комнаты для ' + user.offer.guests + ' гостей';
    cardTimeInAndOut.textContent = 'Заезд после ' + user.offer.checkin + ', выезд после ' + user.offer.checkout;

    getCardFeatures(user, card);

    if (user.offer.description) {
      cardDescription.textContent = user.offer.description;
    } else {
      cardDescription.classList.add('hidden');
    }

    getCardPhotos(user, card);

    return card;
  };

  window.card = {
    create: createCardOfAnnouncements
  };
})();
