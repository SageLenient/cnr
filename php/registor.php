<?php
	require "conn.php";
	if(isset($_POST["phone"])||isset($_POST["submit"])){
		$tel=$_POST["phone"];
		$result=mysql_query("select * from user where tel='$tel'");
		if(mysql_fetch_array($result)){//存在
			echo true;
		}else{//不存在
			echo false;
		}
	}else{
		exit('非法操作');
	};
	if(isset($_POST["submit"])){
		$tel=$_POST["phone"];
		$user=$_POST["username"];
		$email=$_POST["email"];
		$password=sha1($_POST["password"]);
		$query="insert user values(NULL,'$user','$tel','$password','$email',NOW())";
		mysql_query($query);
		header("location:http://10.31.162.68/cnrmall/src/login.html");
	}
?>