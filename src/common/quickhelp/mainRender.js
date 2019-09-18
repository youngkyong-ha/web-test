"use strict";

function mainRender(route, data, next) {
  render.init().setMainContents().contents('main.html').done();
}