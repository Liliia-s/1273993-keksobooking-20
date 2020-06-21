'use strict';

var mapPinMainMousedownHandler = function () {
  window.formValidation.mapPinMain.addEventListener('mousemove', bullshit);
  window.formValidation.mapPinMain.addEventListener('mouseup', bullshit);
};

window.formValidation.mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
