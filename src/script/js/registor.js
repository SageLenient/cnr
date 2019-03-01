define(['config'],function(){
	require(['jquery'], function() {
		$('#b_wrap').load('footer.html .b_wrap');
		var telb=false;
		var emailb=false;
		var passb=false;
		var agree=true;
	//手机号验证
		$('#phone').on('focus',function(){
			if($(this).val()==''){
				$('.hint2').html('请输入正确的手机号').css('color','red');
			}
		});
		$('#phone').on('blur',function(){
			var tel=/^1[3578]\d{9}$/;
			if (tel.test($(this).val())) {
				$.ajax({
					type:"post",
					url:"http://10.31.162.68/cnrmall/php/registor.php",
					data:{
						phone:$('#phone').val()
					},
					async:true
				}).done(function(d){
					if(!d){
						$('.hint2').html('√').css('color','green');
						telb=true;
					}else{
						$('.hint2').html('该手机已注册').css('color','red');
						telb=false;
					}
				})
			}else{
				$('.hint2').html('手机号格式不正确').css('color','red');
				telb=false;
			}
		});
	
	//邮箱验证
		$('#email').on('focus',function(){
			if($(this).val()==''){
				$('.hint3').html('请输入正确的邮箱号').css('color','red');
			};
		});
		$('#email').on('blur',function(){
			var eml=/^(\w[\w\-\.\_]+)\@(\w[\w\-\.\_]+)\.(\w[\w\-\.\_]+)$/;
			if (eml.test($(this).val())) {
				$('.hint3').html('√').css('color','green');
				emailb=true;
			}else{
				$('.hint3').html('邮箱格式不正确').css('color','red');
				emailb=false;
			}
		});
	
	//密码验证
		$('#password').on('focus',function(){
			if($(this).val()==''){
				$('.hint4').html('请输入密码').css('color','red');
			}
		});
		$('#password').on('blur',function(){
			if ($(this).val()=='') {
				$('.hint4').html('密码不能为空').css('color','red')
			} else{
				$('.hint4').html('√').css('color','green');
				passb=true;
			}
		})
	//同意协议
		/*if ($('#check-agree').attr('check','')) {
			agree=true;
		}else{
			agree=false;
			$('.hint5').html('注册请点击同意协议').css('color','red');
		}
		*/
	//提交数据
		$('.btn-submit').on('submit',function(){
			if(telb==false||emailb==false||passb==false||agree==false){
				console.log(telb,emailb,passb,agree);
				return false;
			};
		})
	});
})