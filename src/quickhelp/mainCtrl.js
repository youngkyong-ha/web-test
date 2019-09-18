"use strict";

Top.Controller.create('mainLogic', {
  init: function init(widget) {},
  goGuide: function goGuide(event, widget) {
    Top.App.routeTo('/guide');
  },
  goFaq: function goFaq(event, widget) {
    Top.App.routeTo('/faq');
  }
});