define(['config'],function(){
	require(['jquery','jqcookie'],function(){
	//导入页面头部尾部
		$(".top").load("top.html");
		$(".footer").load("footer.html");
		var $sid=location.search.substring(1).split('=')[1];//获取sid
	//Ajax传值
		$.ajax({
			type:"get",
			url:"http://10.31.162.68/cnrmall/php/detail.php",
			data:{
				sid:$sid
			},
			dataType:'json',
			async:true
		}).done(function(data){
			$('#spic img').attr('src',data.url);
			$('.sum-title h1').html(data.title);
			$('#goods-last').html(data.title);
			$('#price-now .yuan').html(data.price);
			var arrpic=data.urls.split(',');
			var strhtml='';
			$.each(arrpic,function(index,value){
				strhtml+='<li><a href="javascript:;"><img src="'+value+'" /></a></li>';
			});
			$('#list ul').html(strhtml);
		});
	
	//加入购物车(存cookie)
		var arrsid=[];
		var arrnum=[];
		if($.cookie('cookiesid') && $.cookie('cookienum')){
			arrsid=$.cookie('cookiesid').split(',');
			arrnum=$.cookie('cookienum').split(',');
		};
		
		$('#add-btn').on('click',function(){
			if($.inArray($sid,arrsid)==-1){//不存在
				arrsid.push($sid);
				arrnum.push($('#Buycount').val());
				$.cookie('cookiesid',arrsid.toString(),{
			    	expires:7//设置时间，如果此处留空，则浏览器关闭此cookie就失效。
			    });
				$.cookie('cookienum',arrnum.toString(),{
			    	expires:7
			    });
			}else{//存在
				var newnum=parseInt($('#Buycount').val())+parseInt(arrnum[$.inArray($sid,arrsid)]);
				arrnum[$.inArray($sid,arrsid)]=newnum;
				$.cookie('cookienum',arrnum.toString(),{
			    	expires:7
			    });
			}
		});
		$('#buy-btn').on('click',function(){
			if($.inArray($sid,arrsid)==-1){//不存在
				arrsid.push($sid);
				arrnum.push($('#Buycount').val());
				$.cookie('cookiesid',arrsid.toString(),{
			    	expires:7//设置时间，若为空，则浏览器关闭此cookie就失效。
			    });
				$.cookie('cookienum',arrnum.toString(),{
			    	expires:7
			    });
			}else{//存在
				var newnum=parseInt($('#Buycount').val())+parseInt(arrnum[$.inArray($sid,arrsid)]);
				arrnum[$.inArray($sid,arrsid)]=newnum;
				$.cookie('cookienum',arrnum.toString(),{
			    	expires:7
			    });
			}
		});
	//input框对购买数量进行控制
		//+控制数量增加
		$('.buy-add').on('click', function() {
		    var $count=$(this).parents('.buy-data').find('.buy-input input').val();//值
		    console.log($count);
		    $count++;
		    if ($count >= 999) {
		        $count = 999;
		    };
		    $(this).parents('.buy-data').find('.buy-minus i').css('color','black');
		    $(this).parents('.buy-data').find('.buy-minus').css('cursor','pointer');
		    $(this).parents('.buy-data').find('.buy-input input').val($count);
		    everygood($(this));//单个商品总价
		    countall();//计算总价
			setcookie($(this));//将改变的数量重新添加到cookie*/
		});
		
		//-控制商品数量减少
		$('.buy-minus').on('click', function() {
		    var $count = $(this).parents('.buy-data').find('.buy-input input').val();//值
		    $count--;
		    if ($count <= 1) {
		        $count = 1;
		        $(this).css({'cursor':'not-allowed'});
		        $(this).find('i').css({'color':'#E1E1E1'});
		    };
		    $(this).parents('.buy-data').find('.buy-add i').css({'color':'black'});
			$(this).parents('.buy-data').find('.buy-add').css({'cursor':'pointer'});
		    $(this).parents('.buy-data').find('.buy-input input').val($count);
		    everygood($(this));//单个商品总价
		    countall();//计算总价
			setcookie($(this));//将改变的数量重新添加到cookie
		});
	
	//input框改变数量
		$('.buy-input input').on('blur',function(){
			if ($(this).val()>=999) {
				$(this).val(999);
				$(this).parents('.buy-data').find('.buy-add i').css({'color':'#E1E1E1'});
				$(this).parents('.buy-data').find('.buy-add').css({'cursor':'not-allowed'});
				$(this).parents('.buy-data').find('.buy-minus i').css('color','black');
		    	$(this).parents('.buy-data').find('.buy-minus').css('cursor','pointer');
			} else if($(this).val()<=1){
				$(this).val(1);
				$(this).parents('.buy-data').find('.buy-add i').css({'color':'black'});
				$(this).parents('.buy-data').find('.buy-add').css({'cursor':'pointer'});
				$(this).parents('.buy-data').find('.buy-minus i').css('color','#E1E1E1');
		    	$(this).parents('.buy-data').find('.buy-minus').css('cursor','not-allowed');
			};
			setcookie($(this))////将改变的数量重新添加到cookie
		})
	})
});
