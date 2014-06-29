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
	<style type="text/css">
		.phone-screen,
		.signupProcess, .signupProcess-actionForm {
			Aoverflow: visible;
		}
	</style>
</head>

<body>

	<div class="phone">
		<div class="phone-screen">
			
			<div class="headerContainer lyt-pos-rel">
				<?php $pgMgr->includeWebModule(VB_PageManager::MOBILE_MODULE_HEADER); ?>
			</div>
		
			<div class="contentContainer signupWindowContainer"></div>
			
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
		var ENV_Go_watching_your_favorite_drama = "Go watching your favorite<br/>drama !",
			ENV_className = {
				nextBtn : "nextBtn",
				submitBtn : "submitBtn",
				thinMargin : "thinMargin"
			},
			ENV_url = {
				mainPage : ViBox.RESRC.url.mobile_mainPage,		
				startPage : ViBox.RESRC.url.mobile_startPage	
			};
		
		ViBox.addModule("mobileSignupProcess",
			/*	Arg:
					<OBJ> data = {
						<ELM> stdSignupProcess = the standard signupProcess module
					}
			*/
			function (data) {
				var mobileSignupProcess = data.stdSignupProcess;
					
				// remove .closeBtn
				Array.prototype.forEach.call(mobileSignupProcess.querySelectorAll(".closeBtn"), function (btn, idx, arr) {
					btn.parentNode.removeChild(btn);
				});
				
				// write 'Go watching your favorite<br/>drama !'
				mobileSignupProcess.querySelector(".signupProcess-actionForm-board.signupProcess-final")
						.querySelectorAll(".signupProcess-actionForm-boardShelf")[3]
						.innerHTML = ENV_Go_watching_your_favorite_drama;
				
				// Add .thinMargin
				ViBox.addClass(
					mobileSignupProcess.querySelector(".signupProcess-actionForm-board.signupProcess-final")
								.querySelectorAll(".signupProcess-actionForm-boardShelf")[2]
								.querySelector("h3"),
					ENV_className.thinMargin
				);
				
				return mobileSignupProcess;
			}
		);
		
		/***
		 * Get the DOM element
		 */
		var header = ViBox.newModule("header", { header : document.querySelector(".header"), navMode : "backNav", title : "Sign up" }),
			signupWindowContainer = document.querySelector(".signupWindowContainer"),
			mobileSignupProcess = ViBox.newModule("mobileSignupProcess", { stdSignupProcess : ViBox.newModule("signupProcess") });
		
		/***
		 * Build up the mobile app
		 */
		 
		var pgCtrl = {
				init : function () {					
					// Add the final(1st) back task
					ViBox.taskStack.push(function () {
						location.assign(ENV_url.startPage);
					});
					
					// Build the signup process
					signupWindowContainer.appendChild(mobileSignupProcess);
					
					ViBox.addEvt(mobileSignupProcess, "click", function (e) {

					if (ViBox.hasClass(e.target, ENV_className.nextBtn)) {
							
							mobileSignupProcess.goNext();
							
							// Push one task so that there is a chance to go back 
							ViBox.taskStack.push(function () {
								mobileSignupProcess.goBack();
							});
							
						} else if (ViBox.hasClass(e.target, ENV_className.submitBtn)) {
						
						location.assign(ENV_url.mainPage);
						}
					});
				}
			};
		pgCtrl.init();
	}());
	</script>
</body>
</html>