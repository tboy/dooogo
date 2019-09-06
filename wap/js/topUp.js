// 调用接口初始化用户的余额userMoney
var userMoney = "63.50";

var money = $("#O-money");
var minus = $("#O-minus");
var plus = $("#O-plus");
var number = $("#O-topUpNumber");
var topUp = $("#O-topUp");

money.text(userMoney);

plus.click(function () {
  var changeNumber = parseInt(number.text()) + 1000;
  number.text(changeNumber);
});

minus.click(function () {
  if (number.text() === '1000') {
    return false;
  } else {
    var changeNumber = parseInt(number.text()) - 1000;
    number.text(changeNumber);
  }
})

topUp.click(function () {
  var changeMoney = parseInt(number.text());
  var initMoney = parseFloat(money.text());
  var endMoney = initMoney + changeMoney;
  money.text(endMoney.toFixed(2));
  // 此处调用接口将余额变量endMoney传递给后端并且添加一条充值记录
})