define(['config'],function(){
	require(['jquery','jqcookie'],function(){
	//引入页面尾部
		$('.b_wrap').load('footer.html .b_wrap');
	//自动填充cookie中的手机号和密码
		if($.cookie('cookiephone') && $.cookie('cookiepass')){
			$('#phone').val($.cookie('cookiephone'));
			$('#password').val($.cookie('cookiepass'));
		};
		var $phone='';
		var $pass='';
	//ajax确认密码是否一致
		var sflag=false;
		$('#login-submit').on('click',function(){
			if($('#phone').val()!=''&&$('#password').val()!=''){
				$.ajax({
					type:"post",
					url:"http://10.31.162.68/cnrmall/php/login.php",
					data:{
						phone:$('#phone').val(),
						password:$('#password').val()
					},
					async:false,
				}).done(function(d){
					if (d) {
						$phone=$('#phone').val();
						$pass=$('#password').val();
						sflag=true;
						//如果找到数据，存储cookie
						$.cookie('cookiephone',$phone.toString(),{
					    	expires:7
					    });
					    $.cookie('cookiepass',$pass.toString(),{
					    	expires:7
					    });
					    window.location.href='http://10.31.162.68/cnrmall/src/';
					}else{
						alert('账号或密码错误');
					}
				});
			}else{
				alert('账号密码不能为空')
			};
		});
	})
	
})