<?php
	include "conn.php";

	$result=mysql_query("select * from cnrpic");
	
	$list=array();
	for ($i=0; $i < mysql_num_rows($result); $i++) { 
		$list[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
	};
	echo json_encode($list);
?>