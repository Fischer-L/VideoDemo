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

<body class="signupState">
	<div class="headerContainer">
		<?php $pgMgr->includeWebModule(VB_PageManager::WEB_MODULE_HEADER); ?>
	</div>
	
	<div class="contentContainer container_16">
		<div class="contentContainer-sideContent grid_4">
			<?php $pgMgr->includeWebModule(VB_PageManager::WEB_MODULE_NAV_PANEL); ?>
		</div>
		<div class="contentContainer-mainContent grid_12"></div>		
		<div class="clear"></div>
	</div>
	
	<div class="footerContainer">
		<?php $pgMgr->includeWebModule(VB_PageManager::WEB_MODULE_FOOTER); ?>
	</div>
	
	<div class="signupWindowContainer">
		<div class="signupWindow lyt-pos-rel">
			<div class="ViBox-logo"></div>
			<div class="signupProcess">
				<div class="signupProcess-processBoard">
					<div class="signupProcess-processBoard-board">
						<div class="signupProcess-processBoard-title">Watch drama</div>
					</div>
					<div class="signupProcess-processBoard-board">
						<div class="signupProcess-processBoard-boardShadow">
							<div class="signupProcess-processBoard-title"></div>
							<div class="signupProcess-processBoard-arw"></div>
						</div>
						<div class="signupProcess-processBoard-title">Fill info</div>
						<div class="signupProcess-processBoard-arw"></div>
					</div>
					<div class="signupProcess-processBoard-board signupProcess-in">
						<div class="signupProcess-processBoard-boardShadow">
							<div class="signupProcess-processBoard-title"></div>
							<div class="signupProcess-processBoard-arw"></div>
						</div>
						<div class="signupProcess-processBoard-title">Add account</div>
						<div class="signupProcess-processBoard-arw"></div>
					</div>
					<div class="clear"></div>
				</div>
			</div>
		</div>
	</div>
	
	<?php	
		$pgMgr->includeJS(array(
			VB_PageManager::JS_STD,
			VB_PageManager::JS_WEB_STD,
			VB_PageManager::JS_WEB_SIGNUP
		));
	?>
	
	<script type="text/javascript">
	(function () {
		/***
		 * Some enviroment vars
		 */
		var ENV_dramaTypePOP = "popular",
			ENV_dramaTypeJP = "jp",
			ENV_dramaTypeKOR = "kor",
			ENV_dramaTypeTW = "tw",
			ENV_dramaTypeCN = "cn",
			ENV_dramaTypeUS = "us",
			ENV_playerURL = ViBox.RESRC.url.webPlayerPage;
			ENV_dramaBoxSize = {
				L : "L", S : "S"
			};
		/***
		 * Get the DOM element
		 */
		var mainContentContainer = document.querySelector(".contentContainer-mainContent");
		/***
		 * Build up the web app
		 */
		var uiBuilder = {
				
				buildDramaBox : function (type, size) {
					var data = {
							size : size,
							title : "Drama title",
							dstHref : ENV_playerURL
						};
					
					switch (type) {
						case ENV_dramaTypeJP:
							data.posterSrc = ViBox.RESRC.url.jpDramaPoster;
						break;
						
						case ENV_dramaTypeKOR:
							data.posterSrc = ViBox.RESRC.url.korDramaPoster;
						break;
						
						case ENV_dramaTypeTW:
							data.posterSrc = ViBox.RESRC.url.twDramaPoster;
						break;
						
						case ENV_dramaTypeCN:
							data.posterSrc = ViBox.RESRC.url.cnDramaPoster;
						break;
						
						case ENV_dramaTypeUS:
							data.posterSrc = ViBox.RESRC.url.usDramaPoster;
						break;
						
						default:
							return null;
					}
					
					return ViBox.newModule("dramaBox", data);
				},
				
				buildDramaContent : function (type) {
				
					var box,
						contentBox;
					
					switch (type) {
					
						case ENV_dramaTypePOP:
						
							contentBox = ViBox.newModule("contentBox", {					
								title : "Popular",
								boxClassName : "channel-popular",
								boxLayout : ["halfBox", "quarterBox", "quarterBox"]
						    });
						   
						   box = contentBox.querySelector(".contentBox-halfBox");
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeKOR, ENV_dramaBoxSize.L));
						   
						   box = contentBox.querySelectorAll(".contentBox-quarterBox")[0];
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeJP, ENV_dramaBoxSize.S));
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeTW, ENV_dramaBoxSize.S));
						   
						   box = contentBox.querySelectorAll(".contentBox-quarterBox")[1];
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeCN, ENV_dramaBoxSize.S));
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeUS, ENV_dramaBoxSize.S));
						   
						break;
						
						case ENV_dramaTypeJP:
						
							contentBox = ViBox.newModule("contentBox", {					
								title : "Japan",
								boxClassName : "channel-jp",
								boxLayout : ["quarterBox", "halfBox", "quarterBox"]
						    });
						   
						   box = contentBox.querySelectorAll(".contentBox-quarterBox")[0];
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeJP, ENV_dramaBoxSize.S));
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeJP, ENV_dramaBoxSize.S));
						   
						   box = contentBox.querySelector(".contentBox-halfBox");
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeJP, ENV_dramaBoxSize.L));
						   
						   box = contentBox.querySelectorAll(".contentBox-quarterBox")[1];
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeJP, ENV_dramaBoxSize.S));
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeJP, ENV_dramaBoxSize.S));
						   
						break;
						
						case ENV_dramaTypeKOR:
						
							contentBox = ViBox.newModule("contentBox", {					
								title : "Korea",
								boxClassName : "channel-kor",
								boxLayout : ["quarterBox", "quarterBox", "halfBox"]
						    });
						   
						   box = contentBox.querySelectorAll(".contentBox-quarterBox")[0];
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeKOR, ENV_dramaBoxSize.S));
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeKOR, ENV_dramaBoxSize.S));
						   
						   box = contentBox.querySelectorAll(".contentBox-quarterBox")[1];
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeKOR, ENV_dramaBoxSize.S));
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeKOR, ENV_dramaBoxSize.S));
						   
						   box = contentBox.querySelector(".contentBox-halfBox");
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeKOR, ENV_dramaBoxSize.L));
						   
						break;
						
						case ENV_dramaTypeTW:
						
							contentBox = ViBox.newModule("contentBox", {					
								title : "Taiwan",
								boxClassName : "channel-tw",
								boxLayout : ["halfBox", "quarterBox", "quarterBox"]
						    });
						   
						   box = contentBox.querySelector(".contentBox-halfBox");
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeTW, ENV_dramaBoxSize.L));
						   
						   box = contentBox.querySelectorAll(".contentBox-quarterBox")[0];
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeTW, ENV_dramaBoxSize.S));
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeTW, ENV_dramaBoxSize.S));
						   
						   box = contentBox.querySelectorAll(".contentBox-quarterBox")[1];
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeTW, ENV_dramaBoxSize.S));
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeTW, ENV_dramaBoxSize.S));						   
						   
						break;
						
						case ENV_dramaTypeCN:
						
							contentBox = ViBox.newModule("contentBox", {					
								title : "China",
								boxClassName : "channel-cn",
								boxLayout : ["quarterBox", "halfBox", "quarterBox"]
						    });
						   
						   box = contentBox.querySelectorAll(".contentBox-quarterBox")[0];
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeCN, ENV_dramaBoxSize.S));
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeCN, ENV_dramaBoxSize.S));
						   
						   box = contentBox.querySelector(".contentBox-halfBox");
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeCN, ENV_dramaBoxSize.L));
						   
						   box = contentBox.querySelectorAll(".contentBox-quarterBox")[1];
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeCN, ENV_dramaBoxSize.S));
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeCN, ENV_dramaBoxSize.S));	
						   
						break;
						
						case ENV_dramaTypeUS:
						
							contentBox = ViBox.newModule("contentBox", {					
								title : "USA",
								boxClassName : "channel-us",
								boxLayout : ["quarterBox", "quarterBox", "halfBox"]
						    });
						   
						   box = contentBox.querySelectorAll(".contentBox-quarterBox")[0];
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeUS, ENV_dramaBoxSize.S));
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeUS, ENV_dramaBoxSize.S));
						   
						   box = contentBox.querySelectorAll(".contentBox-quarterBox")[1];
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeUS, ENV_dramaBoxSize.S));
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeUS, ENV_dramaBoxSize.S));	
						   
						   box = contentBox.querySelector(".contentBox-halfBox");
						   box.appendChild(this.buildDramaBox(ENV_dramaTypeUS, ENV_dramaBoxSize.L));
						   
						break;
						
						default:
							return null;
					}
					return contentBox;
				}
				
			},
			
			pgCtrl = {
				
				buildMainContent : function () {
					
					var frag = document.createDocumentFragment();
					([
						ENV_dramaTypePOP, 
						ENV_dramaTypeJP, 
						ENV_dramaTypeKOR, 
						ENV_dramaTypeTW, 
						ENV_dramaTypeCN, 
						ENV_dramaTypeUS						
					])
					.forEach(function (dramaType, idx, arr) {
						frag.appendChild(uiBuilder.buildDramaContent(dramaType));
					});
					
					mainContentContainer.appendChild(frag);
				},
				
				init : function () {					
					this.buildMainContent();					
				}				
			};
		pgCtrl.init();
	}());
	</script>
</body>
</html>