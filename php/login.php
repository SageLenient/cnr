<?php
	require 'conn.php';
	if(isset($_POST["phone"]) && isset ($_POST['password'])){
		$tel=$_POST['phone'];
		$pass=sha1($_POST['password']);
		$result=mysql_query("select * from user where tel='$tel' and password='$pass'");
		if(mysql_fetch_array($result,MYSQL_ASSOC)){
			echo true;
		}else{
			echo false;
		}
	}
	
?>