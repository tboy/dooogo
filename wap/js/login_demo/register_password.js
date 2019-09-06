var inputPassword = $("#O-register_password");
var button = $("#O-button");
var deleteButton = $("#O-delete");
var eyeButton = $("#O-eye");

button.click(function () {
  /*location.href = "../html/register_authCode.html";*/
})

inputPassword.keyup(function () {
  if ($(this).val() !== '') {
    deleteButton.show();
  } else {
    deleteButton.hide();
  }
})

deleteButton.click(function () {
  inputPassword.val('');
  $(this).hide();
})

eyeButton.click(function () {
  if (inputPassword.attr("type") === "password") {
    inputPassword.attr("type", "text");
  } else {
    inputPassword.attr("type", "password");
  }
})
