const gulp=require('gulp');//加载gulp插件
const gulpsass=require('gulp-sass');
const html=require('gulp-minify-html');
const concat=require('gulp-concat');
const uglify=require('gulp-uglify');
const rename=require('gulp-rename');
const watch=require('gulp-watch');//添加此插件进行监听
const imagemin = require('gulp-imagemin');//图片压缩插件

//1.新建gulp任务
/*gulp.task('taskname',function(callback){//taskname:任务名称，如果任务名称设置为default，执行的时候，只需要gulp
	console.log('hello,gulp123');
	callback();//callback或者return
});*/

//2.将开放目录下面的文件复制到线上目录(无需插件)
//gulp.src():引入文件的目录
//gulp.dest() : 输出文件目录设置
//pipe() : 管道（流）
gulp.task('copyfile',function(){
	return  gulp.src('src/index.html').pipe(gulp.dest('dist/'));
});


//3.sass编译--gulp-sass
gulp.task('runsass',function(){
	return  gulp.src('src/sass/index.scss')
	.pipe(gulpsass({outputStyle:'compressed'}))//执行编译
	.pipe(gulp.dest('dist/css/'))
});


//4.压缩html
gulp.task('uglifyhtml',function(){
	return  gulp.src('src/*.html')
	.pipe(html())//执行压缩
	.pipe(gulp.dest('dist/'));
});


//5.合并压缩js
gulp.task('alljs',function(){
	return gulp.src('src/script/js/*.js')
	.pipe(concat('all.js'))//合并以及重命名
	/*.pipe(rename('all.min.js'))//重命名
	.pipe(uglify())//先合并再压缩一步只生成all.min.js*/
	.pipe(gulp.dest('dist/script/js/'));
});
gulp.task('minjs',function(){
	return gulp.src('dist/script/js/all.js')
	.pipe(rename('all.min.js'))//重命名
	.pipe(uglify())//压缩
	.pipe(gulp.dest('dist/script/js/'));
})

//6.图片的压缩
//如果插件安装不成功，可以在清除缓存之后继续按照 npm cache clean --force
//npm cache clean --force
gulp.task('runimg',function(){
	return gulp.src('img')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img/'));
});

//最终监听的写法
//监听需要任务执行一次之后进行操作。
gulp.task('default',function(){
	//watch的第一个参数监听的文件的路径，第二个参数是监听运行的任务名
	watch(['src/sass/index.scss','src/*.html','src/js/*.js'],gulp.parallel('runsass','uglifyhtml','alljs','minjs'));
});


