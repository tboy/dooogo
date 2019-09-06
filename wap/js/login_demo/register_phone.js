register_authCode.htmlvar inputPhone = $("#O-register_phone");
var button = $("#O-register_phone-button");
var deleteButton = $("#O-delete");

button.click(function () {
  location.href = '../html/register_password.html';
})

inputPhone.keyup(function () {
  if ($(this).val() !== '') {
    deleteButton.show();
  } else {
    deleteButton.hide();
  }
})

deleteButton.click(function () {
  inputPhone.val('');
  $(this).hide();
})