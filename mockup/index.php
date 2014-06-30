<!DOCTYPE html>
<!--<?php
	include_once("./php/std_lib.php");	
?>-->
<html>
<head>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8">
	<title>ViBox Mockup</title>
	<?php
		$pgMgr->includeCSS(array(
			VB_PageManager::CSS_STD
		));
	?>
	<style type="text/css">
		body {			
			background: #e5523e;
			background: radial-gradient(circle, #fa8e7f, #e5523e);
		}
	</style>
</head>

<body>
	<?php
		$pgMgr->includeJS(array(
			VB_PageManager::JS_STD
		));
	?>
	<script type="text/javascript">
		document.body.appendChild(ViBox.newModule("bulletinBoard"));
	</script>
</body>
</html>