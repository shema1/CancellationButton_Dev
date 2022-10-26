"use strict";


define(function (require) {

  const wind = require('core/Window');

  const placeholderManager = require("core/placeholderManager");

  var LookupPlaceholder = function ($scope, $element, controlService, openOrdersService, $http, $timeout, $compile) {
    this.getItems = () => {

      var items = [{
        text: "Move/Cancel 2",  // Button name
        key: "IframeCancellationButton",  // Button id (unique)
        content: {
          moduleName: "IframeCancellationButton",
          controlName: "IframeCancellationButton"
        },
        class: "pwp-custom-btn"
      }];

      return items;
    };

    this.isEnabled = (itemKey) => {
      return true;
    };

    this.onClick = function () {

      const dialogs = require("core/dialogs");
      const scope = $scope.$parent;

      const items = scope.viewStats.selected_orders;

      if (items.length === 0 || items.length > 1) {
        dialogs.addNotify(items.length === 0 ? "Please select order before pressing the button." : "Please select only one order", "WARNING");
        return;
      }

      const selectedOrderInfo = scope.viewStats.orders.find(elem => elem.OrderId === items[0].id);

      console.log("selectedOrderInfo", selectedOrderInfo)
      localStorage.setItem('move_cancel_selected_order_info', JSON.stringify(selectedOrderInfo));

      var win = new wind({
        moduleName: "IframeCancellationButton",
        windowName: "IframeCancellationButton",
        title: "Move/Cancel",
        closeOnEscape: false,
        closeOnBackDrop: false,
        data: {
          selectedOrderInfo
        },
        width: "800px",
        height: "600px",
        ngScope: $scope,
      });

      win.open();
    };

  }

  placeholderManager.register("OpenOrders_OrderControlButtons", LookupPlaceholder);

  $(document).ready(function ($scope, sessionManagerService) {

  })
});
