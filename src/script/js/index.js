define(['config'],function(){
	require(['jquery','jqcookie'],function(){
	//引入页面头部
		$('.top-index').load('top.html',function(){
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
		//悬浮框
			var bscroll=true;
			$(window).on('scroll',function(){
				if($(this).scrollTop()>=800){
					if(bscroll){
						$('.header').css({'position':'fixed','z-index':200,'width':"100%",'top':'-109px'}).animate({'top':'-20px'},'slow');
						bscroll=false;
					};
				}else{
					if (!bscroll) {
						$('.header').animate({'top':'-110px'},function(){
							$('.header').css({'position':'relative','top':'0'});
						});
						bscroll=true;
					}
				};
			});
		//搜索框
		//动态创建搜索框函数
			//https://www.cnrmall.com/search/suggest.json?term=
			/*var cScript=document.createElement("script");
			cScript.src="https://www.cnrmall.com/search/suggest.json?term="+$('#search_keyword').val()+'&callback=cnsearch';
			console.log(cScript);*/			
			$('#search_keyword').on('input',function(){
				var $str=$('#search_keyword').val()
				$.ajax({
					type:"get",
					url:'http://10.31.162.68/cnrmall/php/search.php',
					data:{
						str:$str
					},
					async:true
				}).done(function(data){
					var strul='';
					if(data){
						$.each(JSON.parse(data), function(index,value) {
							if (index<5) {
								strul+=`<li><a href="javascript:;">${value}</a></li>`
							};
						});
					}else{
						strul='<li><a href="javascript:;">历史纪录</a></li>'
					};
					$('.search-pop').show().html(strul);
				});
				/*require(["https://www.cnrmall.com/search/suggest.json?term="+$('#search_keyword').val()],function(data){
					console.log(data);
				})*///jsonp格式的获取方式
			});
			$('#search_keyword').on('blur',function(){
				$('.search-pop').hide();
			});
			
		});
	//引入页面尾部
		$('.footer').load('footer.html');
	//tab切换
		$('.menu li').each(function(index,value){
			var strli=`<div class="cate-part cate-part-none" style="top: 0px;">
							<div class="cate-part-col1">
								<div class="cate-detail">
									<dl class="cate-detail-item">
										<dt class="cate-detail-tit"> 
				               <a target="_blank" href="javascript:;">${index}<i class="fa fa-angle-right m-l-5 m-r-0" aria-hidden="true"></i></a> </dt>
										<dd class="cate-detail-con">
											<a target="_blank" href="javascript:;">膨化糕饼</a>
											<a target="_blank" href="javascript:;">坚果炒货</a>
											<a target="_blank" href="javascript:;">蜜饯糖果</a>
											<a target="_blank" href="javascript:;">熟食肉干</a>
											<a target="_blank" href="javascript:;">其它休闲食品</a>
										</dd>
									</dl>
				
									<dl class="cate-detail-item">
										<dt class="cate-detail-tit"> 
				               <a target="_blank" href="javascript:;">粮油副食<i class="fa fa-angle-right m-l-5 m-r-0" aria-hidden="true"></i></a> </dt>
										<dd class="cate-detail-con">
											<a target="_blank" href="javascript:;">大米</a>
											<a target="_blank" href="javascript:;">面粉</a>
											<a target="_blank" href="javascript:;">食用油</a>
											<a target="_blank" href="javascript:;">杂粮</a>
											<a target="_blank" href="javascript:;">粮油制品</a>
											<a target="_blank" href="javascript:;">副食调料</a>
											<a target="_blank" href="javascript:;">其它粮油副食</a>
										</dd>
									</dl>
				
									<dl class="cate-detail-item">
										<dt class="cate-detail-tit"> 
				               				<a target="_blank" href="javascript:;">即食罐头<i class="fa fa-angle-right m-l-5 m-r-0" aria-hidden="true"></i></a>
										</dt>
										<dd class="cate-detail-con">
											<a target="_blank" href="javascript:;">水果罐头</a>
											<a target="_blank" href="javascript:;">鱼类罐头</a>
											<a target="_blank" href="javascript:;">肉类罐头</a>
											<a target="_blank" href="javascript:;">蔬菜类罐头</a>
											<a target="_blank" href="javascript:;">滋补类罐头</a>
											<a target="_blank" href="javascript:;">其他罐头</a>
										</dd>
									</dl>
				
									<dl class="cate-detail-item">
										<dt class="cate-detail-tit"> 
				               			<a target="_blank" href="javascript:;">方便食品<i class="fa fa-angle-right m-l-5 m-r-0" aria-hidden="true"></i></a>
										</dt>
										<dd class="cate-detail-con">
											<a target="_blank" href="javascript:;">方便面/粉/粥</a>
											<a target="_blank" href="javascript:;">自热盒饭</a>
											<a target="_blank" href="javascript:;">烘培速食</a>
											<a target="_blank" href="javascript:;">即食调味菜</a>
											<a target="_blank" href="javascript:;">其他方便食品</a>
										</dd>
									</dl>
								</div>
							</div>
							<div class="sub-class-right">
								<div class="adv-promotions">
									<a title="" href="javascript:;" target="_blank"> <img src="https://pic.cnrmall.com/image/43/8a/438a8473467e0ac9c94fa7384ae14699.jpg"> </a>
									<a title="" href="javascript:;" target="_blank"> <img src="https://pic.cnrmall.com/image/53/77/537797f530e7ce2bff99cc4ba1720c69.jpg"> </a>
									<a title="" href="javascript:;" target="_blank"> <img src="https://pic.cnrmall.com/image/49/0a/490a8253d2a111c6aab75a5182c087b4.jpg"> </a>
								</div>
							</div>
						</div>`;
			$(this).append(strli);
		});
		$('.menu li').on('mouseover',function(){
			$(this).find('.cate-part').removeClass('cate-part-none');
			
		});
		$('.menu li').on('mouseout',function(){
			$(this).find('.cate-part').addClass('cate-part-none');
		});
		
	//秒杀专区幻灯片效果
		//秒杀区图片从后台获取
		$.ajax({
			url:"http://10.31.162.68/cnrmall/php/index-list.php",
			dataType:'json'
		}).done(function(data){
			var strsec='';
			$.each(data,function(index,value){
				strsec+=`
					<li class="sk_items">
                        <div class="sk_goods">
                            <a href="javascript:;" target="_blank" class="sk_link">
                                <img src="${value.url}">
                                <p class="sk_name">${value.title}</p>
                            </a>
                            <span class="sk_shadow"></span>
                        </div>
                        <p class="sk_price">
                            <span class="price-new">
                            	<span class="yuan">￥</span><span class="integer">${value.price}</span><span class="pointer">.</span><span class="decimal">00</span>
                            </span>
                            <span class="price-original">
                            	<span class="yuan">￥</span><span class="integer">69</span><span class="pointer">.</span><span class="decimal">00</span>
                            </span>
                        </p>
                    </li>
				`
			});
			$('.seckill_list .seckill_ppt').html(strsec);
//秒杀区幻灯片效果
			var seclength=$('.seckill_ppt .sk_items').length;
			var secnum=seclength%6+6;
			var secquo=parseInt(seclength/6);
			var secquol=secquo;
			var tempsecquo=secquo;
			var secr='';
			var secl='';
			if (tempsecquo>0) {
				for (var i=0;i<secnum;i++) {
					secr+=$('.seckill_ppt .sk_items').eq(i).prop('outerHTML');
					secl+=$('.seckill_ppt .sk_items').eq(seclength-secnum+i).prop('outerHTML');
				};
			};
			
			$('.seckill_ppt').append(secr);
			$('.seckill_ppt').prepend(secl);
			var seclengthup=$('.seckill_ppt .sk_items').length;
			var liwidth=$('.seckill_ppt .sk_items').eq(1).prop('offsetWidth');
			$('.seckill_ppt').css({'width':seclengthup*liwidth,'left':-secnum*liwidth});
		//移入显示左右切换箭头
			$('.seckill_list').on('mouseover',function(){
				$('.sk_next').show();
				$('.sk_prev').show();
			});
			var tabclick=true;
			//点击右箭头切换
			$('.sk_next').on('click',function(){
				var lx=$('.seckill_ppt').prop('offsetLeft');
				if (tabclick) {
					secquo--;
					console.log("左:"+secquol,"右:"+secquo);
					tabclick=false;
					if (secquo==0) {
						$('.seckill_ppt').animate({'left':lx-(secnum-6)*liwidth});
						tabclick=true;
						secquol=1;
					} else{
						$('.seckill_ppt').animate({'left':lx-6*liwidth},function(){
							if (secquo==-1) {
								$(this).css({'left':-secnum*liwidth});
								secquo=tempsecquo;
								secquol=0;
							};
							tabclick=true;
						});
					};
					console.log("左:"+secquol,"右:"+secquo);
				};
			});
			//点击左箭头切换
			$('.sk_prev').on('click',function(){
				var rx=$('.seckill_ppt').prop('offsetLeft');
				if (tabclick) {
					secquol--;
					console.log("左:"+secquol,"右:"+secquo);
					tabclick=false;
					if (secquol!==-1) {
						$('.seckill_ppt').animate({'left':rx+6*liwidth},function(){
							if(secquol==tempsecquo-1){
								$(this).css({'left':(-seclengthup+seclength)*liwidth});
								secquo=1;
							};
							tabclick=true;
						});
					} else{
						$('.seckill_ppt').animate({'left':rx+(secnum-6)*liwidth},function(){
							secquol=tempsecquo;
							secquo=tempsecquo;
							tabclick=true;
						});
					};
					console.log("左:"+secquol,"右:"+secquo);
				}
			});
			//点击左箭头切换
			$('.sk_prev').on('click',function(){
				var rx=$('.seckill_ppt').prop('offsetLeft');
				if (tabclick) {
					secquo--;
					secquol++;
					tabclick=false;
					if (secquol==1) {
						$('.seckill_ppt').animate({'left':rx+(secnum-6)*liwidth},function(){
							$(this).css({'left':(-seclength)*liwidth});
							tabclick=true;
						})
					} else{
						$('.seckill_ppt').animate({'left':rx+6*liwidth},function(){
							if (secquol==tempsecquo) {
								secquol=0;
								secquo=tempsecquo;
							};
							tabclick=true;
						});
					};
				}
			});
		//移出隐藏左右切换箭头
			$('.seckill_list').on('mouseout',function(){
				$('.sk_next').hide();
				$('.sk_prev').hide();
			});
		});
		
	//秒杀定时器效果
		var sectime=35999;//计时器时间：10小时
    	var oHour='10';
    	var oMin='00';
    	var oSec='00';
		var timer=setInterval(function(){
			oHour=parseInt(sectime/3600);
			if(oHour<10){
				oHour="0"+oHour;
			};
			oMin=parseInt((sectime%3600)/60);
			if (oMin<10) {
				oMin="0"+oMin;
			}
			oSec=(sectime%60);
			if (oSec<10) {
				oSec="0"+oSec;
			};
			$('.timer .hours').html(oHour);
			$('.timer .mins').html(oMin);
			$('.timer .sec').html(oSec);
			sectime-=1;
			if (sectime==-1) {
				clearInterval(timer);
			};
		},1000);
		
	//猜你喜欢界面数据获取
		$.ajax({
			url:"http://10.31.162.68/cnrmall/php/index-list.php",
			dataType:'json'
		}).done(function(data){
			var strimg='<ul>';
			$.each(data, function(index,value) {
				strimg+=
				`<li class="ulike-goods">
					<a href="details.html?sid=${value.sid}" target="_blank">
						<img src="${value.url}"/>
						<div class="ulike-introduce">
	                        <p class="ulike-goods-name">${value.title}</p>
	                        <p class="ulike-goods-price"> <span class="ulike-goods-price-txt">
	                            <span class="yuan">￥</span><span class="integer">${value.price}</span><span class="pointer">.</span><span class="decimal">00</span>
	                        </span> </p>
                        </div>
					</a>
				</li>`
			});
			strimg+='</ul>';
			$('.ulike-content').html(strimg);
		});
		
	//页面图片懒加载
		require(['jqlazy'],function(){
			$('.ulike-goods img, .section_2 img, .section_3 img').addClass("lazy");
			$('.ulike-goods img, .section_2 img, .section_3 img').attr("data-original",function(){
				return $(this).attr('src');
			});
			$('img.lazy').lazyload({
				effect: "fadeIn"
			});
		});
		
	//楼梯效果
		//根据可视区调整楼梯导航位置
		//下滑到对应的区域，左边导航栏点亮
		$(window).on('scroll',function(){
			var $top=$(this).scrollTop();
    		var $floor=$('#floor');
    		var $section1=$('.section_1').offset().top-200;
    		var $section2=$('.section_2').offset().top-200;
    		var $section3=$('.section_3').offset().top-300;
    		var $section4=$('.section_4').offset().top-300;
			if($top>$section1){
				$('#floor li').removeClass('active');
				$('#floor li').eq(1).addClass('active');
			}else{
				$('#floor li').removeClass('active');
				$('#floor li').eq(0).addClass('active');
			}
			if($top>$section2){
				$('#floor li').removeClass('active');
				$('#floor li').eq(2).addClass('active');
			};
			if($top>$section3){
				$('#floor li').removeClass('active');
				$('#floor li').eq(3).addClass('active');
			};
			if($top>$section4){
				$('#floor li').removeClass('active');
				$('#floor li').eq(4).addClass('active');
			};
		})
		//2.点击楼梯导航，进行位置的跳转。
		$('#floor li').not('.last').on('click',function(){
    		$(this).addClass('active').siblings('li').removeClass('active');
    		var $top=$('.section_'+$(this).index()).offset().top;
    		$('html,body').animate({
	    		scrollTop:$top
	    	});
    	});
    	//点击回到顶部
    	$('.last').on('click',function(){
    		$('html,body').animate({
	    		scrollTop:0
	    	});
    	})
	})
});