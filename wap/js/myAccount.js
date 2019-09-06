// 调用接口获取该用户账户余额
var money = "63.50";

var userMoney = $("#O-money");
var topUp = $("#O-topUp");
var detail = $("#O-detail");

userMoney.text(money);

topUp.click(function () {
  location.href = "/user/recharge";
});

detail.click(function () {
  location.href = "/user/capital-subsidiary";
});