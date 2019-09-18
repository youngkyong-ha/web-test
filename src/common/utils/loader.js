"use strict";

var loader = {
  pageAll: function pageAll() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'medium';
    Top.Loader.start({
      parentId: 'MainCommonLayout',
      size: size
    });
  },
  start: function start(id) {
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'medium';
    if (!Top.Dom.selectById(id)) throw new Error('check loader target dom id');
    Top.Loader.start({
      parentId: id,
      size: size
    });
  },
  stop: function stop(id) {
    Top.Loader.stop({
      parentId: id
    });
  }
};