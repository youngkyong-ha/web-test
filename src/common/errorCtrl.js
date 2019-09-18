"use strict";

function errorCtrl404(route, data, next) {
  Top.Dom.selectById('MainCommonLayout').src('error404.html');
}

function errorCtrl403(route, data, next) {
  Top.Dom.selectById('MainCommonLayout').src('error403.html');
}