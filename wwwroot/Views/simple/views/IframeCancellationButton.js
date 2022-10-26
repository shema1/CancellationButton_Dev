var IframeCancellationButtonView = function ($scope) {

  const orderInfo = JSON.parse(localStorage.getItem('move_cancel_selected_order_info'));

  var appFrame = document.getElementById("appFrame");

  appFrame.src = `http://localhost:2000/?token=6c324e9a-bf7d-adb4-900d-eb4420a1e02d&orderId=${orderInfo.OrderId}&email=akornytskyi@brainence.com`

};
