
//配置jQuery,jquerylazy,jquerycookie文件
require.config({
	baseUrl:'https://cdnjs.cloudflare.com/ajax/libs/',//基本路径，下面模块的共有的路径。
	paths:{//文件不能添加扩展名
		'jquery':'jquery/1.12.4/jquery',
		'jqcookie':'jquery-cookie/1.4.1/jquery.cookie',
		'jqlazy':'jquery.lazyload/1.9.1/jquery.lazyload.min',
		/*'jqform':'jquery-validate/1.19.0/jquery.validate.min'*/
	},
	shim:{//非AMD规范的JS文件,就需要使用Require中的shim.
		exports:'',//exports 表示输出的对象名
		dep:['jquery']//deps 为数组,表示其依赖的库,
	}
});
