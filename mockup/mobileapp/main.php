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
		
			<!--div class="contentContainer">
			
				<div class="contentShelf scrollable">
					
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
					
				</div>
			
			</div-->
			
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
		var ENV_className = {
				nextBtn : "nextBtn",
				submitBtn : "submitBtn",
				thinMargin : "thinMargin"
			},
			ENV_url = {
				mainPage : ViBox.RESRC.url.mobile_mainPage,		
				startPage : ViBox.RESRC.url.mobile_startPage	
			};
		
		/***
		 * Get the DOM element
		 */
		var header = ViBox.newModule("header", { header : document.querySelector(".header"), title : "Explore", navMode : ["menuNav", "searchNav"]});
		 
		/***
		 * Build up the mobile app
		 */
		 
		var pgCtrl = {
				init : function () {
				}
			};
		pgCtrl.init();
	}());
	</script>
</body>
</html>