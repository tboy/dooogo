var manage = $("#O-manage");
var manageItem = $("#O-manage-item");
var operationButton = $("#O-manage_button");
var equipmentList = [["移动采集盒子-CJ001",1], ["移动采集盒子-CJ002",2], ["移动采集盒子-CJ003",3]]

// 循环equipmentList里的数据渲染设备列表
var equipmentContent = ""
$.each(equipmentList, function (k, v) {
    equipmentContent += "<div class='manage_item'>" +
        "<div><img src='../image/manage.png' ><span>" + equipmentList[k][1] + "</span></div>" +
        "<div class='item_button'>删除</div>" +
        "</div>"
});
manageItem.append(equipmentContent);

// 设备删除事件
manageItem.on("click", ".item_button", function (e) {
    $(this).parent().remove();
    // 此处调用接口
});

// 跳转下一步
operationButton.click(function () {
    location.href = "/device/new";
});
