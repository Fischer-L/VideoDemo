<!DOCTYPE html>
<!--<?php
	include_once("../php/std_lib.php");	
?>-->
<html>
<head>
	<meta charset="utf-8">
	<title>ViBox Mockup - Mobile App</title>
	<?php
		$pgMgr->includeCSS(array(
			VB_PageManager::CSS_STD,
			VB_PageManager::CSS_MOBILE_STD
		));
	?>
</head>

<body>

	<div class="phone">
		<div class="phone-screen startPage">			
			<button class="btn-sty-1 signinBtn lyt-block sty-cursor-pter">Watch Drama</button>
			<div class="divider lyt-txtAlign-ctr">or</div>
			<button class="btn-sty-0 signupBtn lyt-block sty-cursor-pter">Free Trial</button>			
		</div>
	</div>
	
	<?php	
		$pgMgr->includeJS(array(
			VB_PageManager::JS_STD,
			VB_PageManager::JS_MOBILE_STD
		));
	?>
	
	<script type="text/javascript">
	(function () {
		
		/***
		 * Declare some enviroment vars
		 */
		var ENV_url = {
				mainPage : ViBox.RESRC.url.mobile_mainPage,		
				signupPage : ViBox.RESRC.url.mobile_signupPage	
			};

		/***
		 * Build up the mobile app
		 */
		 
		var pgCtrl = {
				init : function () {
					
					document.body.insertBefore(ViBox.newModule("bulletinBoard", { slidable : true }), document.body.firstChild);
					
					document.querySelector(".signinBtn").onclick = function (e) {
						location.assign(ENV_url.mainPage);
					}
					document.querySelector(".signupBtn").onclick = function (e) {
						location.assign(ENV_url.signupPage);
					}
				}
			};
		pgCtrl.init();
	}());
	</script>
</body>
</html>