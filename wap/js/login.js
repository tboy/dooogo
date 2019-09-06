$('.login_input').focus(function () {
    $(this).parent().find(".input_clear").show();
});

$('.login_input').blur(function () {
	if ($(this).val() == "") {
		$(this).parent().find(".input_clear").hide();
        $(this).parent().find(".help-block-error").hide();
	}
});

$('.input_clear').click(function () {
	$(this).parent().find(".login_input").val('');
	$(this).hide();
});
/*手机号码注册*/
$('.register_phone_input').focus(function () {
    $(this).parent().find(".delete").show();
});

$('.register_phone_input').blur(function () {
    if ($(this).val() == "") {
        $(this).parent().find(".delete").hide();
        $('.error-info').find(".help-block-error").hide();
    }
});
$(".delete").click(function () {
    $(this).parent().find(".register_phone_input").val('');
    $(this).hide();
})
/**重置密码**/
$(".reset-delete").click(function () {
    $(this).parent().find(".register_password_input").val('');
    $(this).hide();
})
$('.register_password_input').focus(function () {
    $(this).parent().find(".reset-delete").show();
});

$('.register_password_input').blur(function () {
    if ($(this).val() == "") {
        $(this).parent().find(".reset-delete").hide();
        $('.error-info').find(".help-block-error").hide();
    }
});
$('#O-eye').click(function () {
    if ($(this).parent().find(".register_password_input").attr("type") === "password") {
        $(this).parent().find(".register_password_input").attr("type", "text");
    } else {
        $(this).parent().find(".register_password_input").attr("type", "password");
    }
});