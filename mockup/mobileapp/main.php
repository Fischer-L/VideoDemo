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
		
			<div class="content signupWindowContainer">
								
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
					<form name="signupProcess-actionForm" class="signupProcess-actionForm lyt-pos-rel nextProc">
						<div class="signupProcess-actionForm-borad signupProcess-start">
							<div class="signupProcess-actionForm-boradShelf">
								<h3>E-Mail</h3>
								<input name="signupProcess-actionForm-email" class="signupProcess-actionForm-email signupProcess-actionForm-longInput">
							</div>
							<div class="signupProcess-actionForm-boradShelf">
								<h3>Passord</h3>
								<input name="signupProcess-actionForm-pw" class="signupProcess-actionForm-pw signupProcess-actionForm-longInput">
							</div>
							<div class="signupProcess-actionForm-boradShelf">
								<h3>Confirm passord</h3>
								<input name="signupProcess-actionForm-repw" class="signupProcess-actionForm-repw signupProcess-actionForm-longInput">
							</div>
							<div class="signupProcess-actionForm-boradShelf">
								Sign up to watch drama for free for 3 days !
							</div>
							<div class="signupProcess-actionForm-boradShelf">
								<button class="nextBtn btn-sty-1 sty-cursor-pter" type="button">Next</button>
							</div>
						</div>
						<div class="signupProcess-actionForm-borad signupProcess-final">
							<div class="signupProcess-actionForm-boradShelf">
								<h3>Name</h3>
								<input name="signupProcess-actionForm-name" class="signupProcess-actionForm-email signupProcess-actionForm-longInput">
							</div>
							
							<div class="signupProcess-actionForm-boradShelf">
								<h3>Gender</h3>
								<label>
									<input name="signupProcess-actionForm-gender" class="signupProcess-actionForm-gender" type="radio" value="female" checked>Female
								</label>
								<label>
									<input name="signupProcess-actionForm-gender" class="signupProcess-actionForm-gender" type="radio" value="male">Male
								</label>
							</div>

							
							<div class="signupProcess-actionForm-boradShelf">
								<h3 class="thinMargin">Birthday</h3>
								<input name="signupProcess-actionForm-yy" class="signupProcess-actionForm-yy signupProcess-actionForm-shortInput" placeholder="yyyy">
								<span class="actionForm-boradShelf-spacer lyt-inlineBlock"></span>
								<input name="signupProcess-actionForm-mm" class="signupProcess-actionForm-mm signupProcess-actionForm-shortInput" placeholder="mm">
								<span class="actionForm-boradShelf-spacer lyt-inlineBlock"></span>
								<input name="signupProcess-actionForm-dd" class="signupProcess-actionForm-dd signupProcess-actionForm-shortInput" placeholder="dd">
							</div>

							
							<div class="signupProcess-actionForm-boradShelf">
								Go watching your favorite<br/>drama !
							</div>
							
							
							<div class="signupProcess-actionForm-boradShelf">
								<button class="submitBtn btn-sty-1 sty-cursor-pter" type="button">Watch drama</button>
							</div>
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
	
	<script type="text.javasscript">
	(function () {
		
		/***
		 * Build up the mobile app
		 */
		 
		var uiBuilder = {
				buildSignupProcess : function () {
					// Add .thinMargin, remove .closeBtn, write 'Go watching your favorite<br/>drama !'
					var elem = ViBox.newModule("signupProcess");
					
				}
			};
		
	}());
	</script>
</body>
</html>