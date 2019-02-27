<?php
	include 'conn.php';
	$id=$_GET['sid'];
	
	$result=mysql_query("select * from cnrpic where sid=$id ");
	
	$list=mysql_fetch_array($result,MYSQL_ASSOC);
	
	echo json_encode($list);
?>