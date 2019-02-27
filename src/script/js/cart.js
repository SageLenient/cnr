define(['config'],function(){
	require(['jquery','jqcookie'],function(){
	//引入头部和尾部
		$('.top').load("top.html .top");
		$('.header').load("top.html .header");
		$('#b_wrap').load('footer.html .b_wrap');
	//引入cookie并渲染页面
		if($.cookie('cookiesid') && $.cookie('cookienum')){
			var s=$.cookie('cookiesid').split(',');//数组sid
			var n=$.cookie('cookienum').split(',');//数组num
			$.each(s,function(i,value){
				//引用函数添加商品
				goodslist(s[i],n[i]);
				nocart();
			});
		};
	//添加商品列表数据函数
		function goodslist(id,count){
			$.ajax({
				url:'http://10.31.162.68/cnrmall/php/cart.php',//获取所有的接口数据
				dataType:'json'
			}).done(function(data){
				$.each(data,function(index,value){
					if(id==value.sid){//遍历判断sid和传入的sid是否相同，方便将那条数据设置到渲染的商品列表中。
						var $clonebox=$('.cart-addli').eq(0).clone(true,true);
						$clonebox.find('.addli-img').find('img').attr('src',value.url);
						$clonebox.find('.addli-img').find('img').attr('sid',value.sid);
						$clonebox.find('.addgood-name').find('a').html(value.title);
						$clonebox.find('.price-num').find('.yuan').html(value.price);
						$clonebox.find('#Buycount').val(count);
						$clonebox.find('.check-li').addClass('check-item');
						//计算单个商品总价。
						$clonebox.find('.info-money').find('.yuan').html((value.price*count));
						$clonebox.css('display','block');
						$('#cart-box').append($clonebox);
						if (count>=999) {
							$clonebox.find('.buy-add i').css({'color':'#E1E1E1'});
							$clonebox.find('.buy-add').css({'cursor':'not-allowed'});
							$clonebox.find('.buy-minus i').css('color','black');
					    	$clonebox.find('.buy-minus').css('cursor','pointer');
						} else if(count<=1){
							$clonebox.find('.buy-add i').css({'color':'black'});
							$clonebox.find('.buy-add').css({'cursor':'pointer'});
							$clonebox.find('.buy-minus i').css('color','#E1E1E1');
					    	$clonebox.find('.buy-minus').css('cursor','not-allowed');
						}else{
							$clonebox.find('.buy-add i').css({'color':'black'});
							$clonebox.find('.buy-add').css({'cursor':'pointer'});
							$clonebox.find('.buy-minus i').css('color','black');
					    	$clonebox.find('.buy-minus').css('cursor','pointer');
						};
					}
				});
				countall();//计算种类、数量和总价
			})
		}
	//计算商品种类、件数和总价函数
		function countall(){
			var $skind=0;
			var $scount=0;
			var $sprice=0;
			$('.cart-addli:visible').each(function(index,element){
			    if($(element).find('.addli-checkbox input').prop('checked')){
			    	$skind++;
				  	$scount+=parseInt($(element).find('#Buycount').val());
					$sprice+=parseInt($(element).find('.money-stat .yuan').html());
			    };
			});
			$('.kinds-total .value').html($skind);
			$('.quantity-total .value').html($scount);
			$('.amount-total .yuan').html($sprice);
		}
		//计算单个商品价格函数(用于input框改变数量时)
		function everygood(obj){
			var everyprice=obj.parents('.cart-addli').find('.price-num .yuan').prop('innerHTML');
			var everynum=obj.parents('.cart-addli').find('.buy-input input').val();
			obj.parents('.cart-addli').find('.money-stat .yuan').html(everynum*everyprice);
		}
	//全选框
		//全选控制
		$('.checkall-btn').on('change',function(){
			$('.check-item').prop('checked',$(this).prop('checked'));
			$('.checkall-btn').prop('checked',$(this).prop('checked'));
			countall();
		});
		//全选框被控制
		var $inputs=$('.check-choose .check-li')
		$('.cart-all').on('change',$inputs,function(){
			if($('.check-choose:visible').find('input:checkbox').length==$('.check-choose:visible').find('input:checked').size()){
				$('.checkall-btn').prop('checked',true);
			}else{
				$('.checkall-btn').prop('checked',false);
			};
			countall();
		})
	//改变cookie的函数
		var arrsid=[];//id
		var arrnum=[];//数量
		//提前获取cookie里面id和num
		function cookiedata(){
			if($.cookie('cookiesid') && $.cookie('cookienum')){
				arrsid=$.cookie('cookiesid').split(',');
				arrnum=$.cookie('cookienum').split(',');
			};
		}
		
		function setcookie(obj){
			cookiedata();
			var $index=obj.parents('.cart-addli').find('img').attr('sid');
	    	arrnum[$.inArray($index,arrsid)] = obj.parents('.cart-addli').find('.buy-input input').val();
			$.cookie('cookienum',arrnum.toString(),{
		    	expires:7
		    });
		}
	//删除cookie的函数
		function delcookie(sid,arrsid){
			var $index=-1;
			$.each(arrsid, function(index,value) {
				if (sid==value) {
					$index=index;
				}
			});
			arrsid.splice($index, 1);//删除数组对应的值
		    arrnum.splice($index, 1);//删除数组对应的值
		    $.cookie('cookiesid', arrsid.toString(), {
		    	expires:7
		    });//添加cookie
		    $.cookie('cookienum', arrnum.toString(), {
		    	expires:7
		    });//添加cookie
		}
	
	//点击删除操作
		//删除单个商品
		$('.icon-del').on('click',function(){
			cookiedata();//得到cookie数据
			if (confirm('你确定将该商品移出购物车吗')) {
				console.log($(this).first().parents('.cart-addli').html());
				$(this).parents('.cart-addli').remove();
		    	delcookie($(this).parents('.cart-addli').find('img').attr('sid'), arrsid);
		    	countall();
			};
			nocart();
		})
		//删除选中的商品
		$('#a-del').on('click',function(){
			if($('.cart-addli:visible').find('input:checkbox').is(':checked')){
				cookiedata();//得到cookie数据
				if (confirm('您确定将选中的商品移出购物车吗')) {
					$('.cart-addli:visible').each(function() {
				        if ($(this).find('input:checkbox').is(':checked')) {//复选框一定是选中的
				            $(this).remove();
				            delcookie($(this).find('img').attr('sid'), arrsid);
				        }
				    });
				}
			}else{
				alert('您未选中任何要删除的商品');
			}
			countall();
			nocart();
		})
		
	//改变商品数量+和-
		//+控制数量增加
		$('.buy-add').on('click', function() {
		    var $count=$(this).parents('.cart-addli').find('.buy-input input').val();//值
		    console.log($count);
		    $count++;
		    if ($count >= 999) {
		        $count = 999;
		        $(this).parents('.cart-addli').find('.buy-add i').css({'color':'#E1E1E1'});
				$(this).parents('.cart-addli').find('.buy-add').css({'cursor':'not-allowed'});
		    };
		    $(this).parents('.cart-addli').find('.buy-minus i').css('color','black');
		    $(this).parents('.cart-addli').find('.buy-minus').css('cursor','pointer');
		    $(this).parents('.cart-addli').find('.buy-input input').val($count);
		    everygood($(this));//单个商品总价
		    countall();//计算总价
			setcookie($(this));//将改变的数量重新添加到cookie*/
		});
		
		//-控制商品数量减少
		$('.buy-minus').on('click', function() {
		    var $count = $(this).parents('.cart-addli').find('.buy-input input').val();//值
		    $count--;
		    if ($count <= 1) {
		        $count = 1;
		        $(this).css({'cursor':'not-allowed'});
		        $(this).find('i').css({'color':'#E1E1E1'});
		    }else if($count<999){
		    	$(this).parents('.cart-addli').find('.buy-add i').css({'color':'black'});
				$(this).parents('.cart-addli').find('.buy-add').css({'cursor':'pointer'});
		    };
		    $(this).parents('.cart-addli').find('.buy-input input').val($count);
		    everygood($(this));//单个商品总价
		    countall();//计算总价
			setcookie($(this));//将改变的数量重新添加到cookie
		});
	
	//input框改变数量
		$('.buy-input input').on('blur',function(){
			if ($(this).val()>=999) {
				$(this).val(999);
				$(this).parents('.cart-addli').find('.buy-add i').css({'color':'#E1E1E1'});
				$(this).parents('.cart-addli').find('.buy-add').css({'cursor':'not-allowed'});
				$(this).parents('.cart-addli').find('.buy-minus i').css('color','black');
		    	$(this).parents('.cart-addli').find('.buy-minus').css('cursor','pointer');
			} else if($(this).val()<=1){
				$(this).val(1);
				$(this).parents('.cart-addli').find('.buy-add i').css({'color':'black'});
				$(this).parents('.cart-addli').find('.buy-add').css({'cursor':'pointer'});
				$(this).parents('.cart-addli').find('.buy-minus i').css('color','#E1E1E1');
		    	$(this).parents('.cart-addli').find('.buy-minus').css('cursor','not-allowed');
			};
			setcookie($(this))////将改变的数量重新添加到cookie
		})
	
	//购物车为空时
		function nocart(){
			if($.cookie('cookiesid') && $.cookie('cookienum')){
				$('.ncc-null-shopping').hide();//cookie存在，购物车有商品，隐藏盒子。
				$('.my-cart').show();
			}else{
				$('.ncc-null-shopping').show();
				$('.my-cart').hide();
			};
		}
		
		
		
		
		
		
		
		
		
		
	})
})