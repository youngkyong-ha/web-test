"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function renderDOM(id, path, afterCallBack) {
  var targetElement = Top.Dom.selectById(id);

  if (!targetElement) {
    return;
  }

  var childId = path.split('.')[0];
  /*
   * hasChild : 해당 child가 하위에 존재하는지 여부를 return한다. return Boolean
   * 
   * Top.App.onWidgetAttach : widgetId에 해당하는 widget이 attach 됐을 때 실행할 콜백 함수를 등록한다.	
   */

  if (!targetElement.hasChild(childId)) {
    targetElement.src(path, function () {
      //			Top.App.onWidgetAttach(childId, function() { 
      if (typeof afterCallBack === 'function') {
        afterCallBack();
      } //			});

    });
  } else {
    if (typeof afterCallBack === 'function') {
      afterCallBack();
    }
  }
}

var render = function () {
  var lyIdList = {
    main: 'MainCommonLayout',
    mainContents: 'main-contents',
    contents: 'contents'
  };

  var defaultRenderList = function () {
    var m = new Map();
    m.set('main', {
      htmlPath: 'main-page.html'
    });
    m.set('mainContents', {
      htmlPath: 'contents-page.html'
    });
    return m;
  }();

  var myRenderList = new Map().keys(); //defaultRenderList 외 나머지

  var isCustomRender = false; // default 로 render 되는 layout을 모두 무시하고  render하려할 때
  // (e.g. tab on-select에 tab 내용을 render하는 로직)

  return {
    init: function init() {
      myRenderList = new Map();
      isCustomRender = false;
      return this;
    },
    done: function done() {
      var _this = this;

      /*
       * * defultRenderList와 myRenderList에 같은 key가 있었다면?
       *   -> myRenderList 에 있는 key/value 쌍으로 덮어씌워짐
       * */
      if (!isCustomRender) myRenderList = new Map([].concat(_toConsumableArray(defaultRenderList), _toConsumableArray(myRenderList))); // const firstKey = myRenderList.keys().next().value;
      // Top.Loader.start({
      //     parentId: lyIdList[firstKey],
      //     size: 'large'
      // });
      // myRenderList.keys() => key 값들로 이루어진 Map Iterator  반환
      // Array.from()은 유사배열을 array로 바꿔줌
      // 유사배열 => {'0': 'zero', '1': 'one', '2': 'two', 'length': 3}
      // map iterator는 array method인 reduce를 사용할 수 없기 때문에 from으로 바꿔줌

      Array.from(myRenderList.keys()).reduce(function (acc, key) {
        return acc.then(function () {
          if (key === 'contents') {
            loader.start('contents', 'large');
          }

          return _this.srcPromiseFactory(key);
        });
      }, Promise.resolve()).then(function () {
        setTimeout(function () {
          loader.stop('contents'); //lyIdList[firstKey]
        }, 0);
      }).catch(function (e) {
        loader.stop('contents'); //lyIdList[firstKey]
      });
    },
    srcPromiseFactory: function srcPromiseFactory(key) {
      var targetKey = key;
      var htmlPath = myRenderList.get(targetKey).htmlPath;

      var cb = function cb() {};

      var isSyncCb = false; // cb, syncCb 둘다 넣었으면 syncCb이 덮어씌움.

      if (typeof myRenderList.get(targetKey).cb === 'function') cb = myRenderList.get(targetKey).cb;

      if (typeof myRenderList.get(targetKey).syncCb === 'function') {
        cb = myRenderList.get(targetKey).syncCb;
        isSyncCb = true;
      }

      return new Promise(function (resolve, reject) {
        var targetDom = !isCustomRender ? Top.Dom.selectById(lyIdList[targetKey]) : Top.Dom.selectById(targetKey);
        if (!targetDom) reject("check target element id : ".concat(lyIdList[targetKey])); // mainContents 무조건 render 포함

        if (!targetDom.hasChild(htmlPath.split('.html')[0]) || targetKey === 'main') {
          targetDom.src(htmlPath, function () {
            resolve({
              cb: cb,
              isSyncCb: isSyncCb
            });
          });
        } else {
          resolve({
            cb: cb,
            isSyncCb: isSyncCb
          }); // 모든 페이지 다시 렌더하도록 설정

          targetDom.src(htmlPath, function () {
            resolve({
              cb: cb,
              isSyncCb: isSyncCb
            });
          });
        }
      }).then(function (o) {
        var cb = o.cb,
            isSyncCb = o.isSyncCb;

        if (isSyncCb) {
          return new Promise(function (resolve, reject) {
            cb(resolve, reject);
          });
        } else {
          typeof cb === 'function' && cb();
        } // then이나 catch는 아무것도 return 하지 않으면 resolve() 한것과 동일한 동작을 함.

      }).catch(function (e) {});
    },
    setMainContents: function setMainContents() {
      var _htmlPath = 'contents-page.html';
      myRenderList.set('mainContents', {
        htmlPath: _htmlPath
      });
      return this;
    },
    contents: function contents(htmlPath, cb, syncCb) {
      myRenderList.set('contents', {
        htmlPath: htmlPath,
        cb: typeof cb === 'function' ? cb : null,
        syncCb: typeof syncCb === 'function' ? syncCb : null
      });
      return this;
    },
    customRender: function customRender(id, htmlPath, cb, syncCb) {
      isCustomRender = true;
      myRenderList.set(id, {
        htmlPath: htmlPath,
        cb: typeof cb === 'function' ? cb : null,
        syncCb: typeof syncCb === 'function' ? syncCb : null
      });
      return this;
    }
  };
}();