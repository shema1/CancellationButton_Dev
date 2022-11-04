"use strict";


define(function (require) {

  const wind = require('core/Window');
  const dialogs = require("core/dialogs");
  const placeholderManager = require("core/placeholderManager");

  var LookupPlaceholder = function ($scope, $element, controlService, openOrdersService, $http, $timeout, $compile) {
    let winAction = null
    this.getItems = () => {

      var items = [{
        text: "Move/Cancel",  // Button name
        key: "IframeCancellationButton",  // Button id (unique)
        icon: "fa fa-cubes",
        content: {
          moduleName: "IframeCancellationButton",
          controlName: "IframeCancellationButton"
        },
        class: "move-cancel-btn"
      }];

      return items;
    };

    this.isEnabled = (itemKey) => {
      return true;
    };

    this.onClick = function () {

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
        width: "1100px",
        height: "600px",
        ngScope: $scope,
      });

      win.open();
      winAction = win
    };

    window.addEventListener('message', function (e) {
      const data = JSON.parse(e.data);
      if (data.cancel) {
        winAction.close()
      }
      if (data.successMessage) {
        winAction.close()
        const message = data.successMessage?.length ? `New orders ${data.successMessage.join(', ')}` : 'SUCCESS'
        dialogs.addNotify(message, "SUCCESS");
      }
    });

  }

  placeholderManager.register("OpenOrders_OrderControlButtons", LookupPlaceholder);

  $(document).ready(function ($scope, sessionManagerService) {

    const findAndAddStyle = () => {
      const targetNode = document.querySelectorAll('[key="Iframe2"]');
      if (targetNode?.length) {
        const btn = targetNode[0]
        btn.style.backgroundColor = "#4867df"
        btn.style.color = "#ffff"
        btn.style.border = "1px solid #4867df"

        clearInterval(interval)
      }
    }

    const interval = setInterval(findAndAddStyle, 1000);

    setTimeout(() => {
      clearInterval(interval)
    }, 10000)

  })
});
