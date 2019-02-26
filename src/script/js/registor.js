define(['config'],function(){
	require(['jquery'], function() {
		$('#b_wrap').load('footer.html .b_wrap');
		
		/*$("#formcn").validate({
			rules: {
				username: {
					required: true,
					minlength: 2,
					maxlength: 20,
				}
			},
			messages: {
				username: {
					required: "请输入用户名",
					minlength: "",
					maxlength: "",
				}
			}
		});
		$.validator.setDefaults({
			//添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)
			success: function(label) {
				label.text('√').css('color', 'green').addClass('valid');
				label.append('<img src="signed-right-icon.png">');
			}
		});*/
	});
})
	