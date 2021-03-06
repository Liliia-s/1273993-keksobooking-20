'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content;
  var cardTemplateArticle = cardTemplate.querySelector('.map__card');

  var getCardFeatures = function (user, card) {
    var cardFeatures = card.querySelector('.popup__features');
    cardFeatures.innerHTML = '';

    if (user.offer.features.length !== 0) {
      user.offer.features.forEach(function (element) {
        var popupFeature = document.createElement('li');
        popupFeature.classList.add('popup__feature', 'popup__feature--' + element);
        cardFeatures.appendChild(popupFeature);
      });
    } else {
      cardFeatures.classList.add(window.util.NAME_CLASS_HIDDEN);
    }
  };

  var getCardPhotos = function (user, card) {
    var cardPhotos = card.querySelector('.popup__photos');
    var cardPhotoTemplate = cardPhotos.querySelector('.popup__photo');
    cardPhotoTemplate.remove();

    if (user.offer.photos.length !== 0) {
      user.offer.photos.forEach(function (element) {
        var cardPhoto = cardPhotoTemplate.cloneNode(true);
        cardPhoto.src = element;
        cardPhotos.appendChild(cardPhoto);
      });
    } else {
      cardPhotos.classList.add(window.util.NAME_CLASS_HIDDEN);
    }
  };

  var types = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
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
      cardAvatar.classList.add(window.util.NAME_CLASS_HIDDEN);
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
      cardDescription.classList.add(window.util.NAME_CLASS_HIDDEN);
    }

    getCardPhotos(user, card);

    return card;
  };

  window.card = {
    create: createCardOfAnnouncements
  };
})();
