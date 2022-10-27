var IframeCancellationButtonView = function ($scope) {
  const orderInfo = JSON.parse(localStorage.getItem('move_cancel_selected_order_info'));
  const session = JSON.parse(window.localStorage.getItem("SPA_auth_session"));
  const token = window.localStorage.getItem("access_token");

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", `${session.server}/api/extensions/getInstalledExtensions`, false);
  xmlHttp.setRequestHeader('Authorization', `Bearer ${token}`);
  xmlHttp.send(null);
  let allApps = JSON.parse(xmlHttp.responseText);
  let cancellationApp = allApps.find(app => app.Name.includes("CancellationButton"))

  var xmlHttp2 = new XMLHttpRequest();
  xmlHttp2.open("GET", `${session.server}/api/extensions/getTemporaryToken?applicationId=${cancellationApp.ApplicationInstallationId}`, false);
  xmlHttp2.setRequestHeader('Authorization', `Bearer ${token}`);
  xmlHttp2.send(null);
  console.log("xmlHttp2.responseText", xmlHttp2.responseText)
  let AppToken = xmlHttp2.responseText.replace('"', '');
  console.log("AppToken AppTokenAppToken", AppToken)
  var appFrame = document.getElementById("appFrame");

  appFrame.src = `http://localhost:2000/?token=${AppToken}&orderId=${orderInfo.OrderId}&email=${session.userName}`

};
