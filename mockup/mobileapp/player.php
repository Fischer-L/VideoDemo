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
	<style type="text/css">
		.phone {
			width: 600px;
			height: 289px;
			position: relative;
			top: 50%;
			margin: -145px auto 0px;
			background: url(../img/iphone_case_landscape.png);
		}
		.phone-screen,
		.player-screen {
			width: 406px;
			height: 234px;	
		}
		.phone-screen {
			top: 27px;
			left: 90px;
			border: 2px solid #666;
			border-right: none;
			cursor: pointer;
		}
	</style>
</head>

<body>

	<div class="phone">
		<div class="phone-screen">
			<div class="player mobile lyt-pos-rel">
				<div class="player-ctrlPanel lyt-pos-rel sty-cursor-pter">
				
					<div class="player-mobileNavPanel lyt-pos-abs">
						<div class="player-mobileNavPanel-backBtn"></div
						><div class="player-mobileNavPanel-title">Episode 10: Episode title</div>
					</div>
					
					<div class="player-ctrlPanel-playBtn pause"></div
					
					><div class="player-ctrlPanel-progress lyt-pos-rel">
						<div class="player-ctrlPanel-progressBar lyt-pos-rel lyt-inlineBlock">
							<div class="progressBar-leftPonit lyt-pos-abs"></div>
							<div class="progressBar-rightPonit lyt-pos-abs"></div>
						</div>
						<div class="player-ctrlPanel-elapsedBar lyt-pos-abs">
							<div class="elapsedBar-leftPonit lyt-pos-abs"></div>
						</div>
						<div class="player-ctrlPanel-progressDrag lyt-pos-abs"></div>
						<div class="player-ctrlPanel-progressInfo lyt-inlineBlock">22:12 / 50:22</div>
					</div
					
					><div class="player-ctrlPanel-quality lyt-pos-rel HD">
						<div class="player-ctrlPanel-qualityBtn">HD</div>
					</div
					
					>
					
					<div class="clear"></div>
				</div>
			</div>
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
				dramaPage : ViBox.RESRC.url.mobile_dramaPage
			};
		
		/***
		 * Get the DOM element
		 */
		var player = ViBox.newModule("player", { player : document.querySelector(".player") });
		 
		/***
		 * Build up the mobile app
		 */
		 
		var pgCtrl = {
				init : function () {
					
					document.body.insertBefore(ViBox.newModule("bulletinBoard", { slidable : true }), document.body.firstChild);
					
					ViBox.taskStack.push(function () {						
						location.assign(ENV_url.dramaPage);
					});
				}
			};
		pgCtrl.init();
	}());
	</script>
</body>
</html>