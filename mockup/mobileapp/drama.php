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
		.drama-info {
			padding: 20px 10px 30px;
			margin-top: 0;
			background: #fff;
			font-size: 0.9em;
			border-bottom: 1px solid #aaa;
		}
		.drama-info > div {
			line-height: 1.5em;
			color: #333;
		}
		.drama-info-title {
			font-weight: bold;
		}
		.contentShelf-bigPoster {
			background-position: -234px 0px;
		}
	</style>
</head>

<body>

	<div class="phone">
		<div class="phone-screen">			
			<div class="headerContainer lyt-pos-rel">
				<?php $pgMgr->includeWebModule(VB_PageManager::MOBILE_MODULE_HEADER); ?>
			</div>		
			<div class="contentContainer">
			
				<div class="contentShelf">
					<div class="contentShelf-bigPoster"></div>
					<div class="contentShelf-shelf drama-info">
						<div>
							<span class="drama-info-title">Actors:</span>&nbsp;&nbsp;&nbsp;actroA, actorB, actorC
						</div>
						<div>
							<span class="drama-info-title">Summary:</span>&nbsp;&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</div>
					</div>
					<div class="contentShelf-shelf episodesContainer"></div>
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
				mainPage : ViBox.RESRC.url.mobile_mainPage,
				playerPage : ViBox.RESRC.url.mobile_playerPage,
				twDramaPoster  :  ViBox.RESRC.url.twDramaPoster
			},
			ENV_episodeTitles = [
				"Episode 1: Episode title", "Episode 2: Episode title", "Episode 3: Episode title",
				"Episode 4: Episode title", "Episode 5: Episode title", "Episode 6: Episode title",
				"Episode 7: Episode title", "Episode 8: Episode title", "Episode 9: Episode title", "Episode 10: Episode title"
			];
		
		/***
		 * Get the DOM element
		 */
		var header = ViBox.newModule("header", { header : document.querySelector(".header"), title : "Drama title", navMode : ["backNav", "searchNav"]});
		 
		/***
		 * Build up the mobile app
		 */
		 
		var uiBuilder = {
				buildEpisodesContainer : function () {
				
					var episodes = [];
					
					ENV_episodeTitles.forEach(function (title, idx, arr) {
						episodes.push({
							title : title,
							dstURL : ENV_url.playerPage,
							posterURL : ENV_url.twDramaPoster
						});						
					});
					
					document.querySelector(".episodesContainer").appendChild(ViBox.newModule("episodeList", { episodes : episodes }));
				}
			},
			pgCtrl = {
				init : function () {
				
					uiBuilder.buildEpisodesContainer();
					
					ViBox.taskStack.push(function () {
						location.assign(ENV_url.mainPage);
					});
				}
			};
		pgCtrl.init();
	}());
	</script>
</body>
</html>