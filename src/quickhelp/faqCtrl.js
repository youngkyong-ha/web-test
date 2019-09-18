"use strict";

Top.Controller.create('faqLogic', {
  init: function init(widget) {},
  goBack: function goBack(event, widget) {
    Top.App.routeTo('/main');
  },
  onOpenFaq: function onOpenFaq(event, widget) {
    var id = widget.id.split('-')[1];
    Top.Dom.selectById("ly-".concat(id, "-open")).setVisible('visible');
    Top.Dom.selectById("ly-".concat(id, "-close")).setVisible('none');
    var faqList = ['productFamily', 'installUsb', 'install', 'tup', 'use'];
    faqList.filter(function (item) {
      return item !== id;
    }).forEach(function (item) {
      Top.Dom.selectById("ly-".concat(item, "-open")).setVisible('none');
      Top.Dom.selectById("ly-".concat(item, "-close")).setVisible('visible');
    });
  },
  onCloseFaq: function onCloseFaq(event, widget) {
    var id = widget.id.split('-')[1];
    Top.Dom.selectById("ly-".concat(id, "-open")).setVisible('none');
    Top.Dom.selectById("ly-".concat(id, "-close")).setVisible('visible');
  },
  goRufus: function goRufus(event, widget) {
    window.open('https://github.com/pbatard/rufus/releases/download/v2.11/rufus-2.11.exe');
  }
});