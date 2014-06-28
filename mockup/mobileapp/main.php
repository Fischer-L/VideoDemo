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
			
			<div class="headerContainer lyt-pos-rel">
				<?php $pgMgr->includeWebModule(VB_PageManager::MOBILE_MODULE_HEADER); ?>
			</div>
		
			<div class="contentContainer">
			
				<!--div class="contentShelf scrollable">
					
					<div class="contentShelf-bigPoster"></div>
					
					<div class="contentShelf-shelf">
							<div class="dramaWall">
								<h3>Popular</h3>
								<div class="dramaWall-tiles">
									<a class="dramaWall-tile dramaWall-tile-leftTile">
										<img class="dramaWall-tile-poster" src="../img/love_myself_L.jpg" />
										<div class="dramaWall-tile-title">Drama title</div>
									</a
									><a class="dramaWall-tile dramaWall-tile-rightTile">
										<img class="dramaWall-tile-poster" src="../img/love_myself_L.jpg" />
										<div class="dramaWall-tile-title">Drama title</div>
									</a
									><a class="dramaWall-tile dramaWall-tile-leftTile">
										<img class="dramaWall-tile-poster" src="../img/love_myself_L.jpg" />
										<div class="dramaWall-tile-title">Drama title</div>
									</a
									><a class="dramaWall-tile dramaWall-tile-rightTile">
										<img class="dramaWall-tile-poster" src="../img/love_myself_L.jpg" />
										<div class="dramaWall-tile-title">Drama title</div>
									</a>
									<div class="dramaWall-moreBtn">More</div>
								</div>
							</div>
					</div>
					<div class="contentShelf-shelf">
							<div class="dramaWall">
								<h3>Popular</h3>
								<div class="dramaWall-tiles">
									<a class="dramaWall-tile dramaWall-tile-leftTile">
										<img class="dramaWall-tile-poster" src="../img/love_myself_L.jpg" />
										<div class="dramaWall-tile-title">Drama title</div>
									</a
									><a class="dramaWall-tile dramaWall-tile-rightTile">
										<img class="dramaWall-tile-poster" src="../img/love_myself_L.jpg" />
										<div class="dramaWall-tile-title">Drama title</div>
									</a
									><a class="dramaWall-tile dramaWall-tile-leftTile">
										<img class="dramaWall-tile-poster" src="../img/love_myself_L.jpg" />
										<div class="dramaWall-tile-title">Drama title</div>
									</a
									><a class="dramaWall-tile dramaWall-tile-rightTile">
										<img class="dramaWall-tile-poster" src="../img/love_myself_L.jpg" />
										<div class="dramaWall-tile-title">Drama title</div>
									</a>
									<div class="dramaWall-moreBtn">More</div>
								</div>
							</div>
					</div>
					<div class="contentShelf-shelf">
							<div class="dramaWall">
								<h3>Popular</h3>
								<div class="dramaWall-tiles">
									<a class="dramaWall-tile dramaWall-tile-leftTile">
										<img class="dramaWall-tile-poster" src="../img/love_myself_L.jpg" />
										<div class="dramaWall-tile-title">Drama title</div>
									</a
									><a class="dramaWall-tile dramaWall-tile-rightTile">
										<img class="dramaWall-tile-poster" src="../img/love_myself_L.jpg" />
										<div class="dramaWall-tile-title">Drama title</div>
									</a
									><a class="dramaWall-tile dramaWall-tile-leftTile">
										<img class="dramaWall-tile-poster" src="../img/love_myself_L.jpg" />
										<div class="dramaWall-tile-title">Drama title</div>
									</a
									><a class="dramaWall-tile dramaWall-tile-rightTile">
										<img class="dramaWall-tile-poster" src="../img/love_myself_L.jpg" />
										<div class="dramaWall-tile-title">Drama title</div>
									</a>
									<div class="dramaWall-moreBtn">More</div>
								</div>
							</div>
					</div>
					
				</div-->
			
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
				dramaPage : ViBox.RESRC.url.mobile_dramaPage,
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
		var header = ViBox.newModule("header", { header : document.querySelector(".header"), title : "Explore", navMode : ["menuNav", "searchNav"]});
		 
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
				}
			};
		pgCtrl.init();
	}());
	</script>
</body>
</html>