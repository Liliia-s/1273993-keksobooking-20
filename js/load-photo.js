'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var chooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var chooserPhotoOfHousing = document.querySelectorAll('.ad-form__upload input[type=file]');
  // var previewPhotoOfHousing = document.querySelector('.ad-form-header__preview img'); создать дом-элемент

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
    chooserAvatar.removeEventListener('change', chooserAvatarChangeHandler);
  };

  window.loadPhoto = {
    chooserAvatar: chooserAvatar,
    chooserHousing: chooserPhotoOfHousing,
    avatar: chooserAvatarChangeHandler,
    housing: chooserPhotoOfHousingChangeHandler
  };
})();
