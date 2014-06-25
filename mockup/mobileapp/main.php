<!DOCTYPE html>
<!--<?php
	include_once("../php/std_lib.php");	
?>-->
<html>
<head>
	<meta charset="utf-8">
	<title></title>
	<?php
		$pgMgr->includeCSS(array(
			VB_PageManager::CSS_STD,
			VB_PageManager::CSS_MOBILE_STD
		));
	?>
</head>

<body>

	<div class="phone">
		<div class="phone-screen">
			
			<div class="header lyt-pos-rel">
				<?php $pgMgr->includeWebModule(VB_PageManager::MOBILE_MODULE_HEADER); ?>
			</div>
		
			<div class="content">
			
				<div class="signupProcess">
					<div class="signupProcess-processBoard">
						<div class="signupProcess-processBoard-board signupProcess-end">
							<div class="signupProcess-processBoard-title">Watch drama</div>
						</div>
						<div class="signupProcess-processBoard-board signupProcess-final">
							<div class="signupProcess-processBoard-boardShadow">
								<div class="signupProcess-processBoard-title"></div>
								<div class="signupProcess-processBoard-arw"></div>
							</div>
							<div class="signupProcess-processBoard-title">Fill info</div>
							<div class="signupProcess-processBoard-arw"></div>
						</div>
						<div class="signupProcess-processBoard-board signupProcess-start signupProcess-in">
							<div class="signupProcess-processBoard-boardShadow">
								<div class="signupProcess-processBoard-title"></div>
								<div class="signupProcess-processBoard-arw"></div>
							</div>
							<div class="signupProcess-processBoard-title">Add account</div>
							<div class="signupProcess-processBoard-arw"></div>
						</div>
						<div class="clear"></div>
					</div>
					<form name="signupProcess-actionForm" class="signupProcess-actionForm lyt-pos-rel">
						<div class="signupProcess-actionForm-borad signupProcess-start">
							 <div class="signupProcess-actionForm-boradShelf"></div> 
						</div>
						<div class="signupProcess-actionForm-borad signupProcess-final">
							 <div class="signupProcess-actionForm-boradShelf"></div> 
						</div>
						<div class="clear"></div>
					</form>
				</div>
			
			</div>
			
		</div>
	</div>
	
	<?php	
		$pgMgr->includeJS(array(
			VB_PageManager::JS_STD
		));
	?>
</body>
</html>