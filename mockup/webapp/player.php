<!DOCTYPE html>
<!--<?php
	include_once("../php/std_lib.php");	
?>-->
<html>
<head>
	<meta charset="utf-8">
	<title>ViBox Demo - Player</title>
	<?php
		$pgMgr->includeCSS(array(
			VB_PageManager::CSS_STD,
			VB_PageManager::CSS_WEB_STD,
			VB_PageManager::CSS_WEB_PLAYER
		));
	?>
</head>

<body>
	<div class="headerContainer noBigPoster">		
		<?php $pgMgr->includeWebModule(VB_PageManager::WEB_MODULE_HEADER); ?>
	</div>
	
	<div class="playerContainer">
		<div class="playerContainer-player player lyt-pos-rel">
			<div class="player-ctrlPanel lyt-pos-rel sty-cursor-pter">
				<div class="player-ctrlPanel-playBtn"></div
				
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
				
				><div class="player-ctrlPanel-volume volume-60 lyt-pos-rel">
					<div class="player-ctrlPanel-volumeBtn"></div>
					<div class="player-ctrlPanel-menuWrp">
						<ul class="player-ctrlPanel-volumeSettings player-ctrlPanel-menu">
							<li class="volumeSettings-100"></li>
							<li class="volumeSettings-80"></li>
							<li class="volumeSettings-60"></li>
							<li class="volumeSettings-40"></li>
							<li class="volumeSettings-20"></li>
						</ul>
					</div>
				</div
				
				><div class="player-ctrlPanel-quality lyt-pos-rel">
					<div class="player-ctrlPanel-qualityBtn">1080P</div>
					<div class="player-ctrlPanel-menuWrp">
						<ul class="player-ctrlPanel-qualitySettings player-ctrlPanel-menu">
							<li class="qualitySettings-best">1080p</li>
							<li class="qualitySettings-hight">720p</li>
							<li class="qualitySettings-mid">480p</li>
						</ul>
					</div>
				</div
				
				><div class="player-ctrlPanel-resizeBtn"></div>
				
				<div class="clear"></div>
			</div>
		</div>
	</div>
	
	<div class="contentContainer container_16">
		<div class="contentContainer-sideContent grid_4">
			<?php $pgMgr->includeWebModule(VB_PageManager::WEB_MODULE_NAV_PANEL); ?>
		</div>
		<div class="contentContainer-mainContent grid_12">
		</div>
		<div class="clear"></div>
	</div>
	
	<div class="footerContainer">
		<?php $pgMgr->includeWebModule(VB_PageManager::WEB_MODULE_FOOTER); ?>
	</div>
	
	<?php	
		$pgMgr->includeJS(array(
			VB_PageManager::JS_STD,
			VB_PageManager::JS_WEB_STD
		));
	?>
	
	<script type="text/javascript">
	(function () {
		
		/***
		 * Declare some enviroment vars
		 */
		var ENV_episodePosterSize = "S";
		
		/***
		 * Get the DOM element
		 */
		var mainContentContainer = document.querySelector(".contentContainer-mainContent"),
			player = ViBox.newModule("player", { player : document.querySelector(".player.playerContainer-player") });			
		
		/***
		 * Build up the web app
		 */	
		var uiBuilder = {
				
				buildCurrentDramaBox : function () {
					
					var currentDramaBox = ViBox.newModule("contentBox", {
						title : "Drama title",
						boxClassName : ["currentDrama"]
					});
					
					currentDramaBox.querySelector(".contentBox-content").innerHTML = '<div class="currentDrama-info">'
																					+	'<h3>Currently-playing episode title</h3>'
																					+'</div>'
																					+'<div class="currentDrama-info">'
																					+	'<h3 class="lyt-float-L">Actors</h3>'
																					+	'<p>actorA, actorB, actorC</p>'
																					+'</div>'
																					+'<div class="clear"></div>'
																					+'<div class="currentDrama-info">'
																					+	'<h3 class="lyt-float-L">Summay</h3>'
																					+	'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'		
																					+'</div>'
																					+'<div class="clear"></div>';
					return currentDramaBox;
				},
				
				/*	Return:
						@ OK: <ELM> the UI element
						@ NG: null
				*/				
				buildDramaBox : function () {					
					return ViBox.newModule("dramaBox", {
							size : ENV_episodePosterSize,
							title : "Episode title",
							dstHref : "#",
							posterSrc : ViBox.RESRC.url.twDramaPoster
					});
				},
				
				buildEpisodesBox : function () {
					
					var episodesBox = ViBox.newModule("contentBox", {					
						title : "Episodes",
						boxLayout : ["quarterBox", "quarterBox", "quarterBox", "quarterBox"]
					});
					
					Array.prototype.forEach.call(
						episodesBox.querySelectorAll(".contentBox-quarterBox"),
						function (box, idx, boxes) {
							box.appendChild(uiBuilder.buildDramaBox());
							box.appendChild(uiBuilder.buildDramaBox());
						}
					);
					
					return episodesBox;
				}
			},
			
			pgCtrl = {
				init : function () {
					mainContentContainer.appendChild(uiBuilder.buildCurrentDramaBox());
					mainContentContainer.appendChild(uiBuilder.buildEpisodesBox());
				}
			};
			pgCtrl.init();
	}());
	</script>
</body>
</html>