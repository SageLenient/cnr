define(['config'],function(){
	require(['jquery','jqcookie'],function(){
	//导入页面头部尾部
		$(".top").load("top.html",function(){
		//获取用户名以及cookie
			if($.cookie('cookiephone') && $.cookie('cookiepass')){
				var $phone=$.cookie('cookiephone');
				$.ajax({
					type:"get",
					url:"http://10.31.162.68/cnrmall/php/user.php",
					data:{
						phone:$phone
					},
					async:true
				}).done(function(d){
					if (d) {
						$('.login a:first-child').html('您好：'+d);
					}
				});
			};
		});
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
		
	//加入购物车按钮(存cookie)
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
		//立即购买到购物车界面
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
		    $count++;
		    if ($count >= 999) {
		        $count = 999;
		    };
		    $(this).parents('.buy-data').find('.buy-minus i').css('color','black');
		    $(this).parents('.buy-data').find('.buy-minus').css('cursor','pointer');
		    $(this).parents('.buy-data').find('.buy-input input').val($count);
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
			}else{
				$(this).parents('.buy-data').find('.buy-minus i').css('color','black');
		    	$(this).parents('.buy-data').find('.buy-minus').css('cursor','pointer');
			}
		});
	//放大镜效果
		//移入图片出现放大镜
		$('#spic').on('mouseover',function(ev){
			$('#bf').show().find('img').attr('src',$('#spic img').attr('src')).css({'width':720,'height':720})
			$('#sf').show();
			var lx=ev.clientX-$(this).offset().left;
			var $sfwh=$('#bf').innerWidth()/$('#bf img').innerWidth()*$(this).innerWidth();
			$('#sf').css({'width':$sfwh,'height':$sfwh})
		});
		//移出隐藏放大镜
		$('#spic').on('mouseout',function(ev){
			$('#sf').hide();
			$('#bf').hide();
		});
		//移动鼠标
		$('#spic').on('mousemove',function(ev){
			var $sfleft=ev.clientX-$('#spic').offset().left-$('#sf').outerWidth()/2;
			var $sftop=ev.clientY+$(window).scrollTop()-$('#spic').offset().top-$('#sf').outerHeight()/2;
			if ($sfleft>0 && $sfleft<$('#spic').innerWidth()-$('#sf').outerWidth()) {
				$('#sf').css({'left':$sfleft});
			} else if($sfleft<=0){
				$('#sf').css({'left':0});
			}else{
				$('#sf').css({'left':$('#spic').innerWidth()-$('#sf').outerWidth()});
			};
			if ($sftop>0 && $sftop<$('#spic').innerHeight()-$('#sf').outerHeight()) {
				$('#sf').css({'top':$sftop});
			} else if($sftop<=0){
				$('#sf').css({'top':0});
			}else{
				$('#sf').css({'top':$('#spic').innerHeight()-$('#sf').outerHeight()});
			};
			var slx=parseInt($('#sf').css('left'));
			var sly=parseInt($('#sf').css('top'))
			var rate=$('#bf').innerWidth()/$('#sf').innerWidth();
			$('#bpic').css({'left':-slx*rate,'top':-sly*rate});
		});
	//列表图片切换点击
		var $liimg=$('#list').find('li img');
		$('#list').delegate('li img','click',function(ev){//delegate绑定事件
			var target=$(ev.target);
			$('#spic img').attr('src',target.attr('src'));
		});
		//点击图片出现大图，并且放大镜消失
		/*$('#spic').on('click',function(){
			
		})*/
	})
});
