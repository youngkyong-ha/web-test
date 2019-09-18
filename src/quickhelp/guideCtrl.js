"use strict";

Top.Controller.create('guideLogic', {
  init: function init(widget) {},
  goBack: function goBack(event, widget) {
    Top.App.routeTo('/main');
  },
  onTabClick: function onTabClick(event, widget) {
    var selectedTab = widget.getSelectedTab().id;
    Top.Dom.selectById('web').setProperties({
      url: "https://tmaxos.com/tos/userguide/".concat(selectedTab, "/")
    });
  }
});