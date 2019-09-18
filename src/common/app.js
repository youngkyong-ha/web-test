"use strict";

// Mobile width fitting
var viewport_meta_tag = document.createElement("meta");
viewport_meta_tag.setAttribute("id", "viewport");
viewport_meta_tag.setAttribute("name", "viewport");
document.getElementsByTagName("head")[0].appendChild(viewport_meta_tag);

(function () {
  function apply_viewport() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      var ww = window.screen.width;
      var mw = 1060;
      var ratio = ww / mw;
      var viewport_meta_tag = document.getElementById("viewport");

      if (ww < mw) {
        viewport_meta_tag.setAttribute("content", "initial-scale=" + ratio + ", minimum-scale=" + ratio + ", user-scalable=yes, width=" + mw);
      } else {
        viewport_meta_tag.setAttribute("content", "initial-scale=1.0, minimum-scale=1.0, user-scalable=yes, width=" + ww);
      }
    }
  }

  window.addEventListener("resize", function () {
    apply_viewport();
  });
  apply_viewport();
})();

Top.App.onLoad(function () {
  Top.App.addRoute({
    "/:url": {
      "activate": "initRouter",
      "route": {
        "/:url": {
          "activate": "secondRouter",
          "route": {
            "/:url": {
              "activate": "thirdRouter",
              "route": {
                "/:url": {
                  "activate": "fourthRouter"
                }
              }
            }
          }
        }
      }
    }
  });
  Top.App.removeRoute("/");
  Top.App.removeRoute("/MainCommonPage");
  var url = window.location.href;
  var current = '';

  if (url.indexOf('#!/') >= 0) {
    current = url.substring(url.indexOf('#!/') + 3);
  }

  Top.App.onWidgetAttach('MainCommonLayout', function () {
    if (current === '' && Top.App.current().path === '/') {
      Top.App.routeTo('/main');
    }
  });
}); // 전역 컨트롤러

Top.Controller.create('CommonLogic', {
  init: function init(event, widget) {}
});