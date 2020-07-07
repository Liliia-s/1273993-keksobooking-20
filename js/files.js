'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var SIZE_FOR_PHOTO = 60;
  var chooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var chooserPhotoOfHousing = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhotoOfHousingContainer = document.querySelector('.ad-form__photo-container');
  var previewPhotoOfHousing = document.querySelector('.ad-form__photo');

  var loadFile = function (element, preview) {
    var file = element.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var createPreviewPhotoElement = function () {
    var blockGrey = document.createElement('div');
    blockGrey.classList.add('ad-form__photo');
    var blockImg = document.createElement('img');
    blockGrey.appendChild(blockImg);
    blockImg.alt = 'Фото жилья';
    blockImg.width = SIZE_FOR_PHOTO;
    blockImg.height = SIZE_FOR_PHOTO;
    previewPhotoOfHousingContainer.appendChild(blockGrey);
    return blockImg;
  };

  var chooserAvatarChangeHandler = function () {
    loadFile(chooserAvatar, previewAvatar);
  };

  var chooserPhotoOfHousingChangeHandler = function () {
    previewPhotoOfHousing.classList.add('hidden'); // переделать
    loadFile(chooserPhotoOfHousing, createPreviewPhotoElement());
  };

  window.files = {
    previewAvatar: previewAvatar,
    chooserAvatar: chooserAvatar,
    chooserHousing: chooserPhotoOfHousing,
    previewPhotoOfHousing: previewPhotoOfHousing,
    loadAvatar: chooserAvatarChangeHandler,
    loadPhotoOfhousing: chooserPhotoOfHousingChangeHandler
  };
})();
