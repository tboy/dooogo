var myAccountVm = avalon.define({
    $id: "myAccount",
    accounBalance: "100.00",
    financialDataTh: ["交易单号", "类型", "产品点数", "剩余产品点数", "时间"],
    financialData: [{
        serialNumber: "198746749815767",
        date: "2019-01-28 11:43:53",
        name: "充点",
        type: "充点",
        money: "-1000",
        lastMoney: "1000",
        shop: "移动设备",
        account: "123123",
        isActive: false
    }, {
        serialNumber: "198746749815767",
        date: "2019-01-28 11:43:53",
        name: "充点",
        type: "充点",
        money: "-1000",
        lastMoney: "1000",
        shop: "移动设备",
        account: "123123",
        isActive: false
    }, {
        serialNumber: "198746749815767",
        date: "2019-01-28 11:43:53",
        name: "充点",
        type: "充点",
        money: "+1000",
        lastMoney: "1000",
        shop: "移动设备",
        account: "123123",
        isActive: true
    }],
    topUpNumber: 1000,
    time: '2019-01-02 11:11:11',//充值时间
    bankNum: "3515 0198 6601 0000 0369",
    enterprise: "厦门道古科技有限公司",
    bankAddress: "中国建设银行股份有限公司厦门文灶支行",
    isShowTopUP: false,
    isShowPay: false,
    isShowOK: false,
    isCharge: false,
    isNoitce: false,
    type: 0,

    charge: function (ty) {
        //充点，ty=0，充点，ty=1:公账充电
        if (ty == 1) {
            this.isShowTopUP = false;
            this.isCharge = true;
        } else {
            this.isShowTopUP = true;
        }
    },
    topUP: function () {
        var that = this;
        this.isShowTopUP = false;
        //充值下一步，0-充点，1-公账充点
        $.ajax({
            url: "/recharge/sure",
            data: {money: this.topUpNumber},
            type: 'POST',
            dataType: 'json',
            success: function (result) {
                $("#order_ids").attr("value", result.order_id);
                $('#order_id').html(result.order_id);
                $('#order_money').html(result.money);
                that.topUpNumber = result.money;
                that.time = result.time;
                //二维码
                new QRCode(document.getElementById("qrcode"), result.qrcode);  // 设置要生成二维码的链接
            }
        });
        this.isShowPay = true;

        var interval = setInterval(this.ajaxstatus, 3000);

    },
    stopUrl: function () {
        window.location.reload();
    },
    notice: function () {
        //公账充点 - 确认充点
        this.isCharge = false
        this.isNoitce = true;
        this.ajaxmail();
    },
    changeNumber: function (type) {
        if (type === "plus") {
            this.topUpNumber += 1000;
        } else {
            if (this.topUpNumber > 1000) {
                this.topUpNumber -= 1000;
            }
        }
    },
    ajaxstatus: function () {
        var that = this;
        var order_id = $('#order_ids').val();
        $.ajax({
            url: "/recharge/order-status",
            data: {order_id: order_id},
            type: 'POST',
            dataType: 'json',
            success: function (result) {
                if (result == 1) {
                    that.isShowPay = false;
                    that.isShowOK = true;
                }
            }
        });
    },
    ajaxmail: function () {
        console.log('mail');
        $.ajax({
            url: "/recharge/mail",
            data: {id: 1},
            type: 'POST',
            dataType: 'json',
            success: function (result) {
            }
        });
    }
});
