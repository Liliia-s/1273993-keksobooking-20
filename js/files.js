'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var chooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var chooserPhotoOfHousing = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhotoOfHousingContainer = document.querySelector('.ad-form__photo-container');
  var previewPhotoOfHousing = document.querySelector('.ad-form__photo');

  var chooserAvatarChangeHandler = function () {
    var file = chooserAvatar.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var createPreviewPhotoElement = function (result) {
    var blockGrey = document.createElement('div');
    blockGrey.classList.add('ad-form__photo');
    var blockImg = document.createElement('img');
    blockGrey.appendChild(blockImg);
    blockImg.src = result;
    blockImg.alt = 'Фото жилья';
    blockImg.width = '60';
    blockImg.height = '60';
    previewPhotoOfHousingContainer.appendChild(blockGrey);
  };

  var addPhotoOfHousing = function (item) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      createPreviewPhotoElement(reader.result);
    });
    reader.readAsDataURL(item);
  };

  var chooserPhotoOfHousingChangeHandler = function () {
    previewPhotoOfHousing.classList.add('hidden'); // переделать
    for (var i = 0; i < chooserPhotoOfHousing.files.length; i++) {
      var file = chooserPhotoOfHousing.files[i];
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        addPhotoOfHousing(file);
      }
    }
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
