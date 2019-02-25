define(['config'],function(){
	require(['jquery','jqcookie'],function(){
		$('.top').load("top.html .top");
		$('.header').load("top.html .header");
		$('#b_wrap').load('footer.html .b_wrap');
	})
})