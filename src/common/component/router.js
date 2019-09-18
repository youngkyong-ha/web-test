"use strict";

var routeInfo = {
  first: null,
  second: null,
  third: null,
  fourth: null
};

function initRouter(route, data, next) {
  var first = '';

  if (route.url === "") {
    Top.App.routeTo('/main');
    return;
  } else {
    first = route.url;
  }

  routeInfo = {
    first: first,
    second: null,
    third: null,
    fourth: null
  };
  var page = Top.Dom.selectById("MainCommonPage");

  if (Top.Dom.selectById('Top_403_error_layout') || Top.Dom.selectById('Top_404_error_layout')) {
    page.setVisible(true);
    page.src("MainCommonLayout.html", function () {
      firstRouter(route, data, next);
    });
  } else if (!Top.Dom.selectById('MainCommonLayout')) {
    page.src("MainCommonLayout.html", function () {
      firstRouter(route, data, next);
    });
  } else {
    firstRouter(route, data, next);
  }
}

function firstRouter(route, data, next) {
  var first = routeInfo.first;
  if (first.split('?').length > 1) first = first.split('?')[0];

  if (next) {
    next();
    return;
  }

  switch (first) {
    case 'main':
      mainRender(route, data, next);
      break;

    case 'guide':
      guideRender(route, data, next);
      break;

    case 'faq':
      faqRender(route, data, next);
      break;

    default:
      Top.App.load404Page();
      break;
  }
}

function secondRouter(route, data, next) {}

function thirdRouter(route, data, next) {}

function fourthRouter(route, data, next) {}