define(['config'],function(){
	require(['jquery','jqcookie'],function(){
		$('.top').load("top.html .top");
		$('.header').load("top.html .header");
		$('#b_wrap').load('footer.html .b_wrap');
	})
})

//配置jQuery,jquerylazy,jquerycookie文件
require.config({
	baseUrl:'https://cdnjs.cloudflare.com/ajax/libs/',//基本路径，下面模块的共有的路径。
	paths:{//文件不能添加扩展名
		'jquery':'jquery/1.12.4/jquery',
		'jqcookie':'jquery-cookie/1.4.1/jquery.cookie',
		'jqlazy':'jquery.lazyload/1.9.1/jquery.lazyload.min'
	},
	shim:{//非AMD规范的JS文件,就需要使用Require中的shim.
		exports:'',//exports 表示输出的对象名
		dep:['jquery']//deps 为数组,表示其依赖的库,
	}
});

define(['config'],function(){
	require(['jquery'],function(){
		$(".top").load("top.html");
		$(".footer").load("footer.html");
	})
});

define(['config'],function(){
	require(['jquery'],function(){
		$('.top').load('top.html');
		$('.footer').load('footer.html');
		
		$.ajax({
			type:"get",
			url:"http://10.31.162.68/cnrmall/php/index-list.php",
			async:true
		}).done(function(){
			
		});
		
		/*require(['jqlazy'],function(){
			$('img').addClass("lazy");
			$('img').attr("data-original",function(){
				return $(this).attr('src');
			});
			$('img.lazy').lazyload({
				effect: "fadeIn"
			});
		});*/
	})
});



define(['config'],function(){
	require(['jquery'],function(){
		$('.b_wrap').load('footer.html .b_wrap');
	})
})
require(['index','details','login']);

define(['config'],function(){
	require(['jquery'], function($) {
		$('#b_wrap').load('footer.html .b_wrap');
		/*alert(1);
		$("#formcn").validate({
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
	