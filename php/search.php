<?php
	header("content-type:text/html;charset=utf-8");
	if(isset($_GET['str'])){
		$result='https://www.cnrmall.com/search/suggest.json?term='.($_GET['str']);
		$content=file_get_contents($result);
		echo $content;
	}
?>