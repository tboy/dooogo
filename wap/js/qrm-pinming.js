$(function () {
    //控制收起展开
    $(".qrm-input-border1").click(function () {
        if ($(".qrm-input-border1 .cap_icon").css("background-image").indexOf("qrm-arrow-top") !== -1) {
            $(".qrm-input-border1 .cap_icon").css("background-image", "url(/images/qrm-arrow-down.png)");
            $(".qrm-lev-1").show();
            $(".qrm-input-border1 .qrm_collapse span").text('收起');
        } else {
            $(".qrm-lev-1").hide();
            $(".qrm-input-border1 .cap_icon").css("background-image", "url(/images/qrm-arrow-top.png)");
            $(".qrm-input-border1 .qrm_collapse span").text('展开');
        }
    });
    $(".qrm-input-border2").click(function () {
        if ($(".qrm-input-border2 .cap_icon").css("background-image").indexOf("qrm-arrow-top") !== -1) {
            $(".qrm-input-border2 .cap_icon").css("background-image", "url(/images/qrm-arrow-down.png)");
            $(".qrm-lev-2").show();
            $(".qrm-input-border2 .qrm_collapse span").text('收起');
        } else {
            $(".qrm-lev-2").hide();
            $(".qrm-input-border2 .cap_icon").css("background-image", "url(/images/qrm-arrow-top.png)");
            $(".qrm-input-border2 .qrm_collapse span").text('展开');
        }
    });
    $(".qrm-input-border3").click(function () {
        if ($(".qrm-input-border3 .cap_icon").css("background-image").indexOf("qrm-arrow-top") !== -1) {
            $(".qrm-input-border3 .cap_icon").css("background-image", "url(/images/qrm-arrow-down.png)");
            $(".qrm-lev-3").show();
            $(".qrm-input-border3 .qrm_collapse span").text('收起');
        } else {
            $(".qrm-lev-3").hide();
            $(".qrm-input-border3 .cap_icon").css("background-image", "url(/images/qrm-arrow-top.png)");
            $(".qrm-input-border3 .qrm_collapse span").text('展开');
        }
    });
    //第一层
    var lev1;
    var lev2;
    var lev3;
    var lev4;
    //第一层 事件代理
    $("body").on("click", ".qrm-lev-1>li", function () {
        //控制背景颜色高亮
        $(this).addClass("active").siblings("li").removeClass("active");
        // 先将input中的值置空
        lev1 = "";
        lev2 = "";
        lev3 = "";
        lev4 = "";
        // 获取当前点击的li的子元素的HTML节点 将获取的节点放到页面显示的第二级中
        var org_id = $(this).children(".orgId").html();
        var html1;
        $.ajax({
            async: false,
            type: 'post',
            url: "/camera/get-store",
            data: {
                "org_id": org_id
            },
            error: function () {
            },
            success: function (result) {
                json = eval(result)
                html1 = "<ul class=\"qrm-lev-2 qrm-lev\">";
                for (var i = 0; i < json.length; i++) {
                    html1 += "<li><span>" + json[i].storeName + "</span><span class=\"storeId\" style=\"display: none\">" + json[i].storeId + "</span><span class=\"orgId\" style=\"display: none\">" + json[i].orgId + "</span><i class=\"qrm-arrow-right\"></i>"
                }
                html1 += "</ul>";
            }
        });
        $(".qrm-lev-2").html(html1);
        $(".qrm-lev-3").html("");
        $(".qrm-lev-4").html("");
        //获取当前点击的li的span中的值 将值传到input中
        lev1 = $(this).children("span").html();
        $(".qrm-input").val("");
        $(".qrm-input").val(lev1);
    });
    //第二层 事件代理
    $("body").on("click", ".qrm-lev-2>li", function () {
        $(this).addClass("active").siblings("li").removeClass("active");
        var store_id = $(this).children(".storeId").html();
        var org_id2 = $(this).children(".orgId").html();
        var html2;
        $.ajax({
            async: false,
            type: 'post',
            url: "/camera/get-device",
            data: {
                "store_id": store_id,
                "org_id": org_id2
            },
            error: function () {
            },
            success: function (result) {
                json = eval(result)
                html2 = "";
                for (var i = 0; i < json.length; i++) {
                    html2 += "<li><span>" + json[i].deviceId + "</span><span style=\"display: none\">" + json[i].orgId + "</span><span style=\"display: none\">" + json[i].storeId + "</span><i class=\"qrm-arrow-right\"></i>"
                }
            }
        });
        // var html2 = $(this).children(".li-zi-2").html();
        lev2 = $(this).children("span").html();
        $(".qrm-lev-3").html(html2);
        $(".qrm-lev-4").html("");
        $(".qrm-input2").val(lev2);
    });
    //第三层 事件代理
    $("body").on("click", ".qrm-lev-3>li", function () {
        $(this).addClass("active").siblings("li").removeClass("active");
        var html3 = $(this).children(".li-zi-3").html();
        lev3 = $(this).children("span").html();
        lev3_orgid = $(this).children("span").eq(1).html();
        lev3_storeid = $(this).children("span").eq(2).html();
        $(".qrm-lev-4").html(html3);
        $(".qrm-input3").val(lev3);
        $(".qrm-input3_orgId").val(lev3_orgid);
        $(".qrm-input3_storeId").val(lev3_storeid);
    });


//给四个区域绑定点击事件 判断当前的下一个区域 如果为空 点击当前区域 qrm-pinming-panel 隐藏 并且把input高亮去掉
    $("body").on("click", ".qrm-lev>li", function () {
        if ($(this).parent().parent().next().children(".qrm-lev").html() == "") {
            // 去掉输入框的高亮状态
            $(".qrm-pinming-panel").hide();
            $(".qrm-pinming").css("border", "1px solid #ddd");
            $(".qrm-pinming").css("background-image", "url(images/qrm-arrow-down.png)");
        }

    })
});