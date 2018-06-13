/**
 * APP调用执行函数
 * add by zeke
 * add date  2017-12-22
 */
function onLoad() {
  document.addEventListener("deviceready", onDeviceReady, false);
}
// device APIs are available
//
function onDeviceReady() {
  // Now safe to use device APIs
  console.log("onDeviceReady");
}