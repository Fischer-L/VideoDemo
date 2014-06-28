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
		
		.episodeList {
			padding: 6px;
		}
		.episodeList-title {
			padding-left: 3px;
			font-size: 1.1em;
			font-weight: bold;
			color: #494949;
		}
		.epsidoeList-episode {
			width: 206px;
			background: #fff;
			padding: 8px;
			margin-top: 8px;
			border: 1px solid #e5e5e5;
			border-bottom-color: #aaa;
			border-right-color: #aaa;
			position: relative;
		}
		.epsidoeList-episode-poster,
		.epsidoeList-episode-title {
			display: inline-block;
		}
		.epsidoeList-episode-poster {
			width: 92px;
		}
		.epsidoeList-playIcon {
			width: 30px;
			height: 30px;
			background: #333;
			background: rgba(0, 0, 0, 0.7);
			border-radius: 50%;
			position: absolute;
			top: 18px;
			left: 38px;
			cursor: pointer;
		}
		.epsidoeList-playIcon:after {
			content: "";
			display: block;
			width: 15px;
			height: 15px;
			position: absolute;
			background: url(../img/icons.png);
			top: 8px;
			left: 11px;
			background-position: -256px -51px;
			cursor: pointer;
		}
		.epsidoeList-episode-title {
			width: 100px;
			height: 52px;
			margin-left: 6px;
			font-size: 0.9em;
			vertical-align: top;
			color: #333;
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
					<div class="contentShelf-shelf">
						
						<ul class="episodeList">
							<li class="episodeList-title">Episodes</li>
							<li class="epsidoeList-episode">
								<a>
									<img class="epsidoeList-episode-poster" src="../img/love_myself_L.jpg" />
								</a
								><span class="epsidoeList-episode-title">Episode 10: Epsisode title</span>
								<div class="epsidoeList-playIcon"></div>
							</li>
						</ul>
						
					</div>
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
				jpDramaPoster  :  ViBox.RESRC.url.jpDramaPoster,
				korDramaPoster :  ViBox.RESRC.url.korDramaPoster,
				twDramaPoster  :  ViBox.RESRC.url.twDramaPoster,
				cnDramaPoster  :  ViBox.RESRC.url.cnDramaPoster,
				usDramaPoster  :  ViBox.RESRC.url.usDramaPoster
			},
			ENV_dramaWallSettings = [
				{
					wallTitle : "Popular",
					posterURLs : [
						ENV_url.jpDramaPoster, ENV_url.korDramaPoster, ENV_url.twDramaPoster, ENV_url.usDramaPoster
					]
				},
				{
					wallTitle : "Japan",
					posterURLs : [
						ENV_url.jpDramaPoster, ENV_url.jpDramaPoster, ENV_url.jpDramaPoster, ENV_url.jpDramaPoster
					]
				},
				{
					wallTitle : "Korea",
					posterURLs : [
						ENV_url.korDramaPoster, ENV_url.korDramaPoster, ENV_url.korDramaPoster, ENV_url.korDramaPoster
					]
				},
				{
					wallTitle : "Taiwan",
					posterURLs : [
						ENV_url.twDramaPoster, ENV_url.twDramaPoster, ENV_url.twDramaPoster, ENV_url.twDramaPoster
					]
				},
				{
					wallTitle : "China",
					posterURLs : [
						ENV_url.cnDramaPoster, ENV_url.cnDramaPoster, ENV_url.cnDramaPoster, ENV_url.cnDramaPoster
					]
				},
				{
					wallTitle : "USA",
					posterURLs : [
						ENV_url.usDramaPoster, ENV_url.usDramaPoster, ENV_url.usDramaPoster, ENV_url.usDramaPoster
					]
				}				
			];
		
		/***
		 * Get the DOM element
		 */
		var header = ViBox.newModule("header", { header : document.querySelector(".header"), title : "Drama title", navMode : ["backNav", "searchNav"]});
		 
		/***
		 * Build up the mobile app
		 */
		 
		var uiBuilder = {
				buildContentContainer : function () {
					
					var data = {
							animation : true,
							contentsOnShelfs : []
						};
						
					ENV_dramaWallSettings.forEach(function (attr, idx, arr) {
						
						var dramas = [];
						
						attr.posterURLs.forEach(function (posterURL, idx, arr) {							
							dramas.push({
								title : "Drama title",
								posterURL : posterURL,
								dstURL : ENV_url.dramaPage
							});							
						});
						
						data.contentsOnShelfs.push(ViBox.newModule(
							"dramaWall",
							{
								wallTitle : attr.wallTitle,
								dramas : dramas
							}
						));
					});
				
					return ViBox.newModule("contentShelf", data);
				}
			},
			pgCtrl = {
				init : function () {
				
					document.querySelector(".contentContainer").appendChild(uiBuilder.buildContentContainer());
					
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