var valCodeInput = $('#val-code-input');
var valCodeItems = $("div[name='val-item']");
var regex = /^[\d]+$/;
var valCodeLength = 0;
var _csrf = $("#_csrf-frontend").val();
var username = $("#form-username").val();
var phoneNo = $("#form-phone").val();
var _type = $("#form-type").val();
$('#val-box').on('click', () => {
  valCodeInput.focus();
});
valCodeInput.on('input propertychange change', (e) => {
  valCodeLength = valCodeInput.val().length;
  if(valCodeInput.val() && regex.test(valCodeInput.val())) {
    $(valCodeItems[valCodeLength - 1]).addClass('available');
    $(valCodeItems[valCodeLength - 1]).text(valCodeInput.val().substring(valCodeLength - 1, valCodeLength));
  }
});
$("#val-box").on('keyup', (e) => {
  if (e.keyCode === 8) {
    $(valCodeItems[valCodeLength]).removeClass('available');
    $(valCodeItems[valCodeLength]).text("");
  }
	if (valCodeInput.val().length == 6) {
        var params = {"phone":phoneNo, "username":username, "_csrf-frontend" : _csrf, "code" : valCodeInput.val(), "type" : _type};
        $.ajax({
            async: false,
            cache: false,
            type: 'GET',
            url: "/site/check-code",
            data: params,
            error : function() {},
            success:function(result){
                console.log(result);
                if(result){
                    window.location.href = "/site/reset-pwd?username="+username;
                }else{
                    alert('验证失败，请和网站客服联系！');
                    return false;
                }
            }
        });
		console.log(valCodeInput.val());
	}
});
function checkForNum (obj) {
  obj.value = obj.value.replace(/[\D]/g, '');
}

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
