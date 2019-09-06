var submitButton = $("#O-login");
var register = $("#O-register");

submitButton.click(function () {
  var user = $("#O-login_phone").val();
  var password = $("#O-login_password").val();
  // 此处调用接口提交登录验证
  console.log(user, password);
})

register.click(function () {
  window.open = '../html/register_phone.html'
})