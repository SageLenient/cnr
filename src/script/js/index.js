define(['config'],function(){
	require(['jquery'],function(){
	//引入页面头部和尾部
		$('.top').load('top.html');
		$('.footer').load('footer.html');
		
	//猜你喜欢界面数据获取
		$.ajax({
			url:"http://10.31.162.68/cnrmall/php/index-list.php",
			dataType:'json'
		}).done(function(data){
			var strimg='<ul>'
			$.each(data, function(index,value) {
				strimg+=
				`<li class="ulike-goods">
					<a href="details.html?sid=${value.sid}">
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
	})
});