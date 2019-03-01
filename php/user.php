<?php
	require 'conn.php';
	$phone=$_GET['phone'];
	
	$result=mysql_query("select * from user where tel=$phone ");
	
	$username=mysql_fetch_array($result,MYSQL_ASSOC);
	
	echo $username['username'];
?>