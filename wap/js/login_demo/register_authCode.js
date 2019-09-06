var valCodeInput = $('#val-code-input');
var valCodeItems = $("div[name='val-item']");
var regex = /^[\d]+$/;
var valCodeLength = 0;
$('#val-box').on('click', () => {
  valCodeInput.focus();
})
valCodeInput.on('input propertychange change', (e) => {
  valCodeLength = valCodeInput.val().length;
  if(valCodeInput.val() && regex.test(valCodeInput.val())) {
    $(valCodeItems[valCodeLength - 1]).addClass('available');
    $(valCodeItems[valCodeLength - 1]).text(valCodeInput.val().substring(valCodeLength - 1, valCodeLength));
  }
})
$(this).on('keyup', (e) => {
  if(e.keyCode === 8) {
    $(valCodeItems[valCodeLength]).removeClass('available');
    $(valCodeItems[valCodeLength]).text("");
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
  $("#O-resend").hide();
  minutes.text("59");
  $("#O-send").show();
  countdown();
});
