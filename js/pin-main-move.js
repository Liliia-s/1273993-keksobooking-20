'use strict';

(function () {
  var MIN_VALUE_Y = 130;
  var MAX_VALUE_Y = 630;
  var mapPinMain = window.formValidation.mapPinMain;

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var documentMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coordinateX = mapPinMain.offsetLeft - shift.x;
      var coordinateY = mapPinMain.offsetTop - shift.y;
      var mapPinMainHalfWidth = Math.round(window.formValidation.MAP_PIN_MAIN_WIDTH / 2);
      var mapPinMainHeight = window.activationPage.MAP_PIN_MAIN_HEIGHT;
      var coordinateMinX = mapPinMain.parentElement.offsetLeft - mapPinMainHalfWidth;
      var coordinateMaxX = mapPinMain.parentElement.offsetWidth - mapPinMainHalfWidth;
      var coordinateMinY = MIN_VALUE_Y - mapPinMainHeight;
      var coordinateMaxY = MAX_VALUE_Y - mapPinMainHeight;

      var findCoordinateOfMapPinMain = function (valueX, valueY, valueMinX, valueMaxX, valueMinY, valueMaxY) {
        if (valueX < valueMinX) {
          valueX = valueMinX;
        }
        if (valueX > valueMaxX) {
          valueX = valueMaxX;
        }
        if (valueY < valueMinY) {
          valueY = valueMinY;
        }
        if (valueY > valueMaxY) {
          valueY = valueMaxY;
        }

        mapPinMain.style.top = valueY + 'px';
        mapPinMain.style.left = valueX + 'px';

        window.formValidation.inputAdress.value = (valueX + mapPinMainHalfWidth) + ', ' + (valueY + mapPinMainHeight);
      };

      findCoordinateOfMapPinMain(coordinateX, coordinateY, coordinateMinX, coordinateMaxX, coordinateMinY, coordinateMaxY);
    };

    var documentMouseupHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', documentMousemoveHandler);
      document.removeEventListener('mouseup', documentMouseupHandler);
    };

    document.addEventListener('mousemove', documentMousemoveHandler);
    document.addEventListener('mouseup', documentMouseupHandler);

  });
})();
