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
			VB_PageManager::CSS_WEB_STD,
			VB_PageManager::CSS_WEB_SIGNUP
		));
	?>
</head>

<body>
	<div class="headerContainer">
		<?php $pgMgr->includeWebModule(VB_PageManager::WEB_MODULE_HEADER); ?>
	</div>
	
	<div class="contentContainer container_16">
		<div class="contentContainer-sideContent grid_4">
			<?php $pgMgr->includeWebModule(VB_PageManager::WEB_MODULE_NAV_PANEL); ?>
		</div>
		<div class="contentContainer-mainContent grid_12">
		
			<div class="contentBox">
				<div class="contentBox-title">Popular</div>
				<div class="contentBox-content">					
					<div class="contentBox-halfBox">
						<a class="dramaBox dramaBox-size-L">
							<img class="dramaBox-poster" src="../img/you_from_star_L.jpg" />
							<div class="dramaBox-title">drama title</div>
						</a>
					</div>
					<div class="contentBox-quarterBox">
						<a class="dramaBox dramaBox-size-S">
							<img class="dramaBox-poster" src="../img/you_from_star_L.jpg" />
							<div class="dramaBox-title">drama title</div>
						</a>
						<a class="dramaBox dramaBox-size-S">
							<img class="dramaBox-poster" src="../img/you_from_star_L.jpg" />
							<div class="dramaBox-title"></div>
						</a>
					</div>
					<div class="contentBox-quarterBox">
						<a class="dramaBox dramaBox-size-S">
							<img class="dramaBox-poster" src="../img/you_from_star_L.jpg" />
							<div class="dramaBox-title"></div>
						</a>
						<a class="dramaBox dramaBox-size-S">
							<img class="dramaBox-poster" src="../img/you_from_star_L.jpg" />
							<div class="dramaBox-title"></div>
						</a>
					</div>
				</div>
				<div class="clear"></div>
			</div>
			
			
			
			<div class="contentBox">
				<div class="contentBox-title">Popular</div>
				<div class="contentBox-content">	
					<div class="contentBox-quarterBox">
						<a class="dramaBox dramaBox-size-S">
							<img class="dramaBox-poster" src="../img/you_from_star_L.jpg" />
							<div class="dramaBox-title">drama title</div>
						</a>
						<a class="dramaBox dramaBox-size-S">
							<img class="dramaBox-poster" src="../img/you_from_star_L.jpg" />
							<div class="dramaBox-title"></div>
						</a>
					</div>				
					<div class="contentBox-halfBox">
						<a class="dramaBox dramaBox-size-L">
							<img class="dramaBox-poster" src="../img/you_from_star_L.jpg" />
							<div class="dramaBox-title">drama title</div>
						</a>
					</div>
					<div class="contentBox-quarterBox">
						<a class="dramaBox dramaBox-size-S">
							<img class="dramaBox-poster" src="../img/you_from_star_L.jpg" />
							<div class="dramaBox-title"></div>
						</a>
						<a class="dramaBox dramaBox-size-S">
							<img class="dramaBox-poster" src="../img/you_from_star_L.jpg" />
							<div class="dramaBox-title"></div>
						</a>
					</div>
				</div>
				<div class="clear"></div>
			</div>
			
		</div>
		
		<div class="clear"></div>
	</div>
	
	<div class="footerContainer">
		<?php $pgMgr->includeWebModule(VB_PageManager::WEB_MODULE_FOOTER); ?>
	</div>
	
	<?php	
		$pgMgr->includeJS(array(
			VB_PageManager::JS_WEB_STD,
			VB_PageManager::JS_WEB_SIGNUP
		));
	?>
</body>
</html>