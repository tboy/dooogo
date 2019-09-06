// 调用接口初始化资金明细记录，用来渲染列表(isIncome字段表示收支类型，用以控制金额显示样式)
var detailList = [{
  name: "营销客群企业收费",
  money: "-63.4",
  date: "2019-01-28 11:43:53",
  code: "169802w3r529",
  isIncome: false
}, {
  name: "充值",
  money: "+1000",
  date: "2019-03-01 11:43:53",
  code: "179802w3r529",
  isIncome: true
}];

detailList.sort(function (a, b) {
  return a < b ? 1 : -1
});

var ul = $("#O-ul");

for (var i = 0; i < detailList.length; i++) {
  var li = $("<li class=\"spend\"></li>");
  var div1 = $("<div class=\"spend_main\"></div>");
  var div2 = $("<div class=\"spend_main\"></div>");

  var liName = $("<div>" + detailList[i].name + "</div>");
  var liDate = $("<div class=\"spend_date\">" + detailList[i].date + "</div>");
  var liCode = $("<div class=\"spend_main_cord\">" + detailList[i].code + "</div>");
  if (detailList[i].isIncome) {
    var liMoney = $("<div class=\"spend_main_money active\">" + detailList[i].money + "</div>");
  } else {
    var liMoney = $("<div class=\"spend_main_money\">" + detailList[i].money + "</div>");
  }

  div1.append(liName).append(liDate);
  div2.append(liCode).append(liMoney);
  li.append(div1).append(div2);
  ul.append(li);
}