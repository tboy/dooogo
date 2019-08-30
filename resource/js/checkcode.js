/**
 * Created by gy on 2019/4/3.
 */
var _csrf = $("#_csrf-frontend").val();
var username = $("#phoneverifyform-username").val();
var phoneNo = $("#phoneverifyform-phone").val();
var _type = $("#phoneverifyform-type").val();
var minutes = $("#O-minutes");
var resendButton = $("#O-resend_button");

function countdown () {
    var temp = parseInt(minutes.text());
    var timer = setInterval(function () {
        if (temp > 0) {
            temp -= 1;
            if (temp < 10) {
                minutes.text('0' + temp);
            } else {
                minutes.text(temp);
            }
        } else {
            clearInterval(timer);
            $("#O-resend").show();
            $("#O-send").hide();
        }
    }, 1000)
}

countdown();

resendButton.click(function () {
    // 此处调用接口重新发送验证码
    var params = {"phone":phoneNo, "username":username, "_csrf-frontend" : _csrf, "type" : _type};
    console.log(params);
    $.ajax({
        async: false,
        cache: false,
        type: 'GET',
        url: "/site/reset-send-code",
        data: params,
        error : function() {},
        success:function(result){
            console.log(result);
            if(result){
                console.log("验证码已经发出");
            }else{
                alert('发送失败，请和网站客服联系！');
                return false;
            }
        }
    });
    $("#O-resend").hide();
    minutes.text("59");
    $("#O-send").show();
    countdown();
});