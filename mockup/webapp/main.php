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
			VB_PageManager::CSS_WEB_STD
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
		<div class="contentContainer-mainContent grid_12"></div>		
		<div class="clear"></div>
	</div>
	
	<div class="footerContainer">
		<?php $pgMgr->includeWebModule(VB_PageManager::WEB_MODULE_FOOTER); ?>
	</div>
	
	<div class="signupWindowContainer">
		<div class="signupWindow lyt-pos-rel">
			<div class="ViBox-logo"></div>
		</div>
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
		 * Declare some enviroment vars or do some preparations
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
		
		ViBox.addModule("signupWindow",
			/*	Arg:
					<OBJ> data = {
						<ELM> signupWindow = the div.signupWindow
					}
			*/
			function (data) {
			
					var startActionFormElemsHTML = [
							'<h3>E-Mail</h3>'
							+'<input name="signupProcess-actionForm-email" class="signupProcess-actionForm-email signupProcess-actionForm-longInput">',
							
							'<h3>Passord</h3>'
							+'<input name="signupProcess-actionForm-pw" class="signupProcess-actionForm-pw signupProcess-actionForm-longInput">',
							
							'<h3>Confirm passord</h3>'
							+'<input name="signupProcess-actionForm-repw" class="signupProcess-actionForm-repw signupProcess-actionForm-longInput">',
							
							'Sign up to watch drama for free for 3 days !',
							
							'<button class="closeBtn btn-sty-2 sty-cursor-pter" type="button">Close</button>'
							+'<button class="nextBtn btn-sty-1 sty-cursor-pter" type="button">Next</button>'
						],
						finalActionFormElemsHTML = [
							'<h3>Name</h3>'
							+'<input name="signupProcess-actionForm-name" class="signupProcess-actionForm-email signupProcess-actionForm-longInput">',
							
							'<h3>Gender</h3>'
							+'<label>'
							+	'<input name="signupProcess-actionForm-gender" class="signupProcess-actionForm-gender" type="radio" value="female" checked>Female'
							+'</label>'
							+'<label>'
							+	'<input name="signupProcess-actionForm-gender" class="signupProcess-actionForm-gender" type="radio" value="male">Male'
							+'</label>',

							'<h3>Birthday</h3>'
							+'<input name="signupProcess-actionForm-yy" class="signupProcess-actionForm-yy signupProcess-actionForm-shortInput" placeholder="yyyy">'
							+'<span class="actionForm-boradShelf-spacer lyt-inlineBlock"></span>'
							+'<input name="signupProcess-actionForm-mm" class="signupProcess-actionForm-mm signupProcess-actionForm-shortInput" placeholder="mm">'
							+'<span class="actionForm-boradShelf-spacer lyt-inlineBlock"></span>'
							+'<input name="signupProcess-actionForm-dd" class="signupProcess-actionForm-dd signupProcess-actionForm-shortInput" placeholder="dd">',

							'Go watching your favorite drama !',
							
							'<button class="closeBtn btn-sty-2 sty-cursor-pter" type="button">Colse</button>'
							+'<button class="submitBtn btn-sty-1 sty-cursor-pter" type="button">Watch drama</button>'
						];
				
				data.signupWindow.signupProcess = ViBox.newModule("signupProcess", {
					startActionFormElemsHTML : startActionFormElemsHTML,
					finalActionFormElemsHTML : finalActionFormElemsHTML
				});				
				data.signupWindow.appendChild(data.signupWindow.signupProcess);
				return data.signupWindow;
			},			
			function (signupWindow) {
			/*	== The enhancement ==
				Methods:
					[ Public ]
					> open = Open the window
					> close = close the window
			*/
			
				signupWindow.open = function () {
					signupWindow.signupProcess.goBack();
					signupWindow.signupProcess.actionForm.reset();
					ViBox.addClass(document.body, "signupState");
				}
				
				signupWindow.close = function () {
					ViBox.removeClass(document.body, "signupState");
				}
				
				signupWindow.onclick = function (e) {
					e = ViBox.normalizeEvent(e);
					if (   ViBox.hasClass(e.target.className, "closeBtn")
						|| ViBox.hasClass(e.target.className, "submitBtn")
					) {
						signupWindow.close();
					} else if (ViBox.hasClass(e.target.className, "nextBtn")) {
						signupWindow.signupProcess.goNext();
					}
				}
				
				return signupWindow;
			}
		);
		
		/***
		 * Get the DOM elements
		 */
		var header = document.querySelector(".header"),
			mainContentContainer = document.querySelector(".contentContainer-mainContent"),
			signupWindow = ViBox.newModule("signupWindow", { signupWindow : document.querySelector(".signupWindow") });
		/***
		 * Build up the web app
		 */		
			/*	Func: Build some UI element
				Methods:
					> buildDramaBox : Build the dramaBox module
					> buildDramaContent : Build the contentBox module storing the dramaBox modules
			*/
		var uiBuilder = {
				/*	Arg:
						<STR> type = Refer to the ENV_dramaType*
						<STR> size = Refer to the ENV_dramaBoxSize
					Return:
						@ OK: <ELM> the UI element
						@ NG: null
				*/				
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
				/*	Arg:
						<STR> type = Refer to the ENV_dramaType*
					Return:
						@ OK: <ELM> the UI element
						@ NG: null
				*/
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
			/*	Func: Initial the whole page. Call the public init method to start the initial process
			*/
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
					
					header.onclick = function (e) {
						e = ViBox.normalizeEvent(e);
						if (ViBox.hasClass(e.target.className, "header-signUpBtn")) {
							signupWindow.open();
						}
					}
				}				
			};
		pgCtrl.init();
	}());
	</script>
</body>
</html>