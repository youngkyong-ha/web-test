"use strict";

function guideRender(route, data, next) {
  render.init().setMainContents().contents('guide.html').done();
}