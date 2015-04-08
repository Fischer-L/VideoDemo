(function (ViBox) {
	
	"use strict";
	
	/*	Func:
			Help constructing the string of css class selectors from the rendering param
		Arg:
			<OBJ> _render = the obj holding the properpty of <ARR<STR>> classNames. This classNames property is the array of css classes being applied.
		Return:
			@ OK: A string of css class selectors which is ready to be appended
			@ NG: ""
	*/
	function renderHelpClassNames(_render) {
		
		var clsNames = [];
		
		if (ViBox.isArr(_render.classNames)) {
			
			for (var i = _render.classNames.length - 1; i >= 0; i--) {	
			
				if (ViBox.isStr(_render.classNames[i])) clsNames.push(_render.classNames[i]);				
			}
		}
		
		return (clsNames.length <= 0) ? "" : " " + clsNames.join(" ");
	}

	var SignupProcess = React.createClass({
		
		render : function () {
		
			return (
				<div className="signupProcess">						
					<SignupProcess.ProcessBoard />
					<SignupProcess.ActionForm />						
				</div>
			);
		}
	}); {
	
		SignupProcess.ProcessBoard = React.createClass({

			render : function () {
					
					var endBoard = {						
							noArw : true,						
							noShadow : true,						
							title : "Watch drama",						
							classNames : [ "signupProcess-end" ]
						},
						
						finalBoard = {						
							title : "Fill info",						
							classNames : [ "signupProcess-final" ]
						},
						
						startBoad = {						
							title : "Add account",						
							classNames : [ "signupProcess-start", "signupProcess-in" ]
						};
						
				return (
					<div className="signupProcess-processBoard">					
						<SignupProcess.ProcessBoard.Board _render={endBoard} />
						<SignupProcess.ProcessBoard.Board _render={finalBoard} />
						<SignupProcess.ProcessBoard.Board _render={startBoad} />					
						<div className="clear"></div>					
					</div>
				);
			}
		});
		
		/*	Properties:
				[ React props ]
				<OBJ> _render = the obj holding params for rendering:
					<STR> [title] = the borad title
					<BOO> [noShadow] = true means no shadow effect. Default is false.
					<BOO> [noArw] = true means no arrow style. Default is false.
					> classNames = Refer to the local renderHelpClassNames function
		*/
		SignupProcess.ProcessBoard.Board = React.createClass({
			
			render : function () {
				
				var boardShadow = (this.props._render.noShadow === true) ? null : (
										<div className="signupProcess-processBoard-boardShadow">
											<div className="signupProcess-processBoard-title"></div>
											<div className="signupProcess-processBoard-arw"></div>
										</div>
								  ),							  
					
					arw = (this.props._render.noArw === true) ? null : (<div className="signupProcess-processBoard-arw"></div>),
					
					title = ViBox.isStr(this.props._render.title) ? this.props._render.title : null;
				return (
					<div className={ "signupProcess-processBoard-board" + renderHelpClassNames(this.props._render) }>
						{boardShadow}
						<div className="signupProcess-processBoard-title">{title}</div>
						{arw}					
					</div>
				);
			}
		});
		
		SignupProcess.ActionForm = React.createClass({

			render : function () {
				
				var startBoard = {
						
						classNames : [ "signupProcess-start" ],
						
						boardShelfContents : [						
							[
								<h3>E-Mail</h3>,
								<input name="signupProcess-actionForm-email" className="signupProcess-actionForm-email signupProcess-actionForm-longInput" />
							],						
							[
								<h3>Passord</h3>,
								<input name="signupProcess-actionForm-pw" className="signupProcess-actionForm-pw signupProcess-actionForm-longInput" />
							],
							[
								<h3>Confirm passord</h3>,
								<input name="signupProcess-actionForm-repw" className="signupProcess-actionForm-repw signupProcess-actionForm-longInput" />						
							],
							[
								<span>Sign up to watch drama for free for 3 days !</span>
							],
							[						
								<button className="closeBtn btn-sty-2 sty-cursor-pter" type="button">Close</button>,
								<button className="nextBtn btn-sty-1 sty-cursor-pter" type="button">Next</button>
							]
						]
					},
					
					finalBoard = {
						
						classNames : [ "signupProcess-final" ],
						
						boardShelfContents : [
							[
								<h3>Name</h3>,
								<input name="signupProcess-actionForm-name" className="signupProcess-actionForm-email signupProcess-actionForm-longInput" />
							],
							[
								<h3>Gender</h3>,
								<label>
									<input name="signupProcess-actionForm-gender" className="signupProcess-actionForm-gender" type="radio" value="female" checked />Female
								</label>,
								<label>
									<input name="signupProcess-actionForm-gender" className="signupProcess-actionForm-gender" type="radio" value="male" />Male
								</label>
							],
							[
								<h3>Birthday</h3>,
								<input name="signupProcess-actionForm-yy" className="signupProcess-actionForm-yy signupProcess-actionForm-shortInput" placeholder="yyyy" maxlength="4" />,
								<span className="actionForm-boardShelf-spacer lyt-inlineBlock"></span>,
								<input name="signupProcess-actionForm-mm" className="signupProcess-actionForm-mm signupProcess-actionForm-shortInput" placeholder="mm" maxlength="2" />,
								<span className="actionForm-boardShelf-spacer lyt-inlineBlock"></span>,
								<input name="signupProcess-actionForm-dd" className="signupProcess-actionForm-dd signupProcess-actionForm-shortInput" placeholder="dd" maxlength="2" />
							],
							[
								<span>Go watching your favorite drama !</span>
							],
							[
								<button className="closeBtn btn-sty-2 sty-cursor-pter" type="button">Colse</button>,
								<button className="submitBtn btn-sty-1 sty-cursor-pter" type="button">Watch drama</button>
							]
						]
					};			
				
				return (
					<form name="signupProcess-actionForm" className="signupProcess-actionForm lyt-pos-rel">
						<SignupProcess.ActionForm.Board _render={startBoard} />
						<SignupProcess.ActionForm.Board _render={finalBoard} />
						<div className="clear"></div>
					</form>
				);
			}
		});
		
		/*	Properties:
				[ React props ]
				<OBJ> _render = the obj holding params for rendering:
					> classNames = Refer to the local renderHelpClassNames function
					<ARR < ARR < ReactElemen > > > boardShelfContents = the array of React elements array which is being used as content inside shelfs.
		*/
		SignupProcess.ActionForm.Board = React.createClass({
			
			render : function () {
			
				var boardShelfs = null;
				
				if (ViBox.isArr(this.props._render.boardShelfContents)) {
					
					var i, j,
						relem,
						relems,
						contents = this.props._render.boardShelfContents;
					
					boardShelfs = [];
					
					for (i = 0; i < contents.length ; i++) {
						
						relems = contents[i];
						
						for (j = relems.length - 1; j >= 0; j--) {
							
							if (!React.isValidElement(relems[j])) relems.pop();
						}
						
						if (relems.length > 0) {
						
							boardShelfs.push(
								<div className="signupProcess-actionForm-boardShelf">{relems}</div>
							);
						}
					}
					
					if (boardShelfs.length <= 0) boardShelfs = null;
				}
			
				return (
					<div className={ "signupProcess-actionForm-board" + renderHelpClassNames(this.props._render) }>
						{boardShelfs}
					</div>
				);
			}
		});
	
		/*	== The enhancement ==
			Properties:
				[ Private ]
				<OBJ> _className = the table of the usseful CSS classes
				<ELM> _actionForm, _startProcBoard, _finalProcBoard = the child elements
				[ Public ]
				<ELM> actionForm = the sign-up action form
			Methods:
				[ Private ]
				> _isAtStartProc : Check if it is now at the start process
				[ Public ]
				> goNext : Go to the next process
				> goBack : Go back to the previous process
		*/
		SignupProcess.domEnhancer = function (elem) {
		
			var _className = {
					"nextProc" : "nextProc",
					"signupProcess-in" : "signupProcess-in"
				},
				_startProcBoard = elem.querySelector(".signupProcess-processBoard-board.signupProcess-start"),
				_finalProcBoard = elem.querySelector(".signupProcess-processBoard-board.signupProcess-final");
			
			elem.actionForm = elem.querySelector(".signupProcess-actionForm");
			
			/*	Return:
					@ OK: true
					@ NG: false
			*/
			function _isAtStartProc() {
				return ViBox.hasClass(_startProcBoard.className, _className["signupProcess-in"]);
			}
			
			elem.goNext = function () {
				if (_isAtStartProc()) {
					ViBox.addClass(this.actionForm, _className["nextProc"]);
					ViBox.removeClass(_startProcBoard, _className["signupProcess-in"]);
					ViBox.addClass(_finalProcBoard, _className["signupProcess-in"]);
				}
			}
			
			elem.goBack = function () {
				if (!_isAtStartProc()) {
					ViBox.removeClass(this.actionForm, _className["nextProc"]);
					ViBox.addClass(_startProcBoard, _className["signupProcess-in"]);
					ViBox.removeClass(_finalProcBoard, _className["signupProcess-in"]);
				}
			}
			
			return elem;
		};
	}

	var Player  = React.createClass({
		
		render : function () {
			
			var mobileNavPanel = this.props._render.isMobile ? <Player.MobileNavPanel /> : null;
			
			return (
				<div className={ "player lyt-pos-rel" + (this.props._render.isMobile ? " mobile" : "") }>		
					<div className="player-ctrlPanel lyt-pos-rel sty-cursor-pter">
						{mobileNavPanel}
						<Player.CtrlPanel.PlayBtn />
						<Player.CtrlPanel.Progress />
						<Player.CtrlPanel.Volume />
						<Player.CtrlPanel.Quality _render={this.props._render} />
						<Player.CtrlPanel.ResizeBtn />
						<div className="clear"></div>
					</div>
				</div>
			);
		}
	}); {
		
		Player.MobileNavPanel = React.createClass({
			
			render : function () {
				
				return (
					<div className="player-mobileNavPanel lyt-pos-abs">
						<div className="player-mobileNavPanel-backBtn"></div>
						<div className="player-mobileNavPanel-title">Episode 10: Episode title</div>
					</div>
				);
			}
		});
				
		Player.CtrlPanel = {};
		
		Player.CtrlPanel.PlayBtn = React.createClass({
			
			render : function () {
				return <div className="player-ctrlPanel-playBtn"></div>;
			}
		});
		
		Player.CtrlPanel.Progress = React.createClass({
			
			render : function () {
				
				return (
					<div className="player-ctrlPanel-progress lyt-pos-rel">
						<div className="player-ctrlPanel-progressBar lyt-pos-rel lyt-inlineBlock">
							<div className="progressBar-leftPonit lyt-pos-abs"></div>
							<div className="progressBar-rightPonit lyt-pos-abs"></div>
						</div>
						<div className="player-ctrlPanel-elapsedBar lyt-pos-abs">
							<div className="elapsedBar-leftPonit lyt-pos-abs"></div>
						</div>
						<div className="player-ctrlPanel-progressDrag lyt-pos-abs"></div>
						<div className="player-ctrlPanel-progressInfo lyt-inlineBlock">22:12 / 50:22</div>
					</div>
				);
			}
		});
		
		Player.CtrlPanel.Volume = React.createClass({
			
			render : function () {
				return (
					<div className="player-ctrlPanel-volume volume-60 lyt-pos-rel">
						<div className="player-ctrlPanel-volumeBtn"></div>
						<div className="player-ctrlPanel-menuWrp">
							<ul className="player-ctrlPanel-volumeSettings player-ctrlPanel-menu">
								<li className="volumeSettings-100"></li>
								<li className="volumeSettings-80"></li>
								<li className="volumeSettings-60"></li>
								<li className="volumeSettings-40"></li>
								<li className="volumeSettings-20"></li>
							</ul>
						</div>
					</div>
				);
			}
		});
		
		Player.CtrlPanel.Quality = React.createClass({
			
			render : function () {
				
				var btn;
				
				if (this.props._render.isMobile) {
					
					btn = <div className="player-ctrlPanel-qualityBtn">HD</div>;
					
				} else {
					
					btn = [
						<div className="player-ctrlPanel-qualityBtn">1080P</div>,
						
						<div className="player-ctrlPanel-menuWrp">
							<ul className="player-ctrlPanel-qualitySettings player-ctrlPanel-menu">
								<li className="qualitySettings-best">1080p</li>
								<li className="qualitySettings-high">720p</li>
								<li className="qualitySettings-mid">480p</li>
							</ul>
						</div>						
					];
				}
				
				return (
				
					<div className={ "player-ctrlPanel-quality lyt-pos-rel"  + (this.props._render.isMobile ? " HD" : "") }>
						{btn}
					</div>
				);
			}
		});
		
		Player.CtrlPanel.ResizeBtn = React.createClass({
			
			render : function () {
				return <div className="player-ctrlPanel-resizeBtn"></div>;
			}
		});
						
		/*	Properties:
				[ Private ]
				<DAT> _openTime = the time at which the control panel opens
				<NUM> _maxOpenDuration = the max duration for opening the control panel used for count down
				<OBJ> _className = the table of the CSS class name
				<OBJ> _qualities = the video quality table: mid, high, best
				<ARR> _volumes = the volume level array
				<ELM> _ctrlPanel, _playBtn, _volumeCtrl = the control components
			Methods:
				[ Private ]
				> _closeCountDown : Close the control panel when the count down ends
				[ Public ]
				> isMobileMode : Check if in the mobile mode
				> isCtrlPanelOpen : Check if the control panel is open
				> openCtrlPanel : Open the control panel
				> closeCtrlPanel : Close the control panel
				> play : Play the video
				> pause : Pause the video
				> setVolume : Set the video volume (In the mobile mode we ignore this function so useless)
				> isMute : Check if mute (In the mobile mode we ignore this function so useless)
				> setQuality : Set the video quality
		*/
		Player.domEnhancer = function (player) {
		
			var _openTime,
				_maxOpenDuration = 2000,
				_className = {
					pause : "pause",
					playBtn : "player-ctrlPanel-playBtn",
					playerPresent : "present",
					menuPresent : "present",
					volumePrefix : "volume-",
					volumeBtn : "player-ctrlPanel-volumeBtn",
					qualityBtn : "player-ctrlPanel-qualityBtn",
					qualityBest : "qualitySettings-best",
					qualityHigh : "qualitySettings-high",
					qualityMid : "qualitySettings-mid",
					mobileMode : "mobile",
					mobile_qualityHD : "HD",
					mobile_backBtn : "player-mobileNavPanel-backBtn"
				},
				_qualities = {
					"mid" : 480,
					"high" : 720,
					"best" : 1080
				},
				_volumes = [ 0, 20, 40, 60, 80, 100 ];
						
			var _ctrlPanel = player.querySelector(".player-ctrlPanel"),
				_playBtn = player.querySelector(".player-ctrlPanel-playBtn"),
				_volumeCtrl = player.querySelector(".player-ctrlPanel-volume");
			
			/*
			*/
			function _closeCountDown() {
				if (ViBox.isDate(_openTime)) {
					if ((new Date()).getTime() - _openTime.getTime() > _maxOpenDuration) {
						player.closeCtrlPanel();
					} else {
						setTimeout(_closeCountDown, _maxOpenDuration);
					}
				}
			}
			/*	Return:
					@ OK: true
					@ NG: false
			*/
			player.isMobileMode = function () {
				return ViBox.hasClass(this, _className.mobileMode);
			}
			/*	Return:
					@ OK: true
					@ NG: false
			*/
			player.isCtrlPanelOpen = function () {
				return ViBox.hasClass(_ctrlPanel.className, _className.playerPresent);
			}
			/*
			*/
			player.openCtrlPanel = function () {
			
				if (!this.isCtrlPanelOpen()) {				
					_openTime = new Date();
					ViBox.addClass(_ctrlPanel, _className.playerPresent);
					_closeCountDown();
				}
			}
			/*
			*/
			player.closeCtrlPanel = function () {		
				if (this.isCtrlPanelOpen()) {
					ViBox.removeClass(_ctrlPanel, _className.playerPresent);		
					_openTime = null;
				}			
			}
			/*
			*/
			player.play = function () {
				ViBox.removeClass(_playBtn, _className.pause);
			}
			/*
			*/
			player.pause = function () {
				ViBox.addClass(_playBtn, _className.pause);		
			}		
			/*
			*/
			player.setVolume = function (volume) {
				
				if (this.isMobileMode()) return; // In the mobile mode we ignore this function
				
				var lv = volume / 20,
					classes = [];
				
				_volumes.forEach(function (volume, idx, arr) {
					classes.push(_className.volumePrefix + volume);
				});
				ViBox.removeClass(_volumeCtrl, classes);
				ViBox.addClass(_volumeCtrl, _className.volumePrefix + _volumes[lv]);
				
				if (lv >= 1) {
					_volumeCtrl.currentVolume = _volumes[lv];
				}
			}
			/*	Return:
					@ The mobile mode: undefined
					@ Mute under the web mode: true 
					@ Not mute under the web mode: false
			*/
			player.isMute = function () {
				return this.isMobileMode() ? undefined : ViBox.hasClass(_volumeCtrl, _className.volumePrefix + _volumes[0]);
			}
			/*	Arg:
					<STR> quality = the quality to set, refer to this::_qualities for the available qualites. Under the mobile mode, any quality exceeds the mid quality(not inlcuded) would set to the HD quality
			*/
			player.setQuality = function (quality) {			
				var qualityBtn = this.querySelector("." + _className.qualityBtn);
				
				if (this.isMobileMode()) {
					
					if (quality != "mid") {
						ViBox.addClass(qualityBtn.parentNode, _className.mobile_qualityHD);
					} else {
						ViBox.removeClass(qualityBtn.parentNode, _className.mobile_qualityHD);
					}
					
				} else {
					qualityBtn.innerHTML = _qualities[quality] + "p";
				}
			}
			
			_ctrlPanel.onclick = function (e) {
				e = ViBox.normalizeEvent(e);
				
				_openTime = new Date(); // Reset the time of opening while clicking on the control panel
				
				if (ViBox.hasClass(e.target, _className.playBtn)) {
					
					if (ViBox.hasClass(e.target, _className.pause)) {
						player.play();				
					} else {
						player.pause();
					}				
				}
				
				if (player.isMobileMode()) {
					
					if (ViBox.hasClass(e.target, _className.qualityBtn)) {
					
						if (ViBox.hasClass(this.querySelector(".player-ctrlPanel-quality"), _className.mobile_qualityHD)) {
							player.setQuality("mid");
						} else {
							player.setQuality("high");
						}					
					
					} else if (ViBox.hasClass(e.target, _className.mobile_backBtn)) {
						
						ViBox.taskStack.pop();
						
					}
				
				} else {
				
					if (ViBox.hasClass(e.target, _className.volumeBtn)) {
					
						if (player.isMute()) {
							player.setVolume(_volumeCtrl.currentVolume);
						} else {
							player.setVolume(0);
						}
						
					} else if (ViBox.hasClass(e.target, _className.qualityBest)) {
						
						player.setQuality("best");
					
					} else if (ViBox.hasClass(e.target, _className.qualityHigh)) {
					
						player.setQuality("high");
					
					} else if (ViBox.hasClass(e.target, _className.qualityMid)) {
						
						player.setQuality("mid");
						
					}			
				}				
			}
			
			if (player.isMobileMode()) {			
				player.onclick = function (e) {
					this.openCtrlPanel();
				}			
			} else {
				
				_volumeCtrl.currentVolume = _volumes[3];
				
				player.onmouseover = function (e) {
					this.openCtrlPanel();
				}
			}
			
			return player;
		}
	}
	
	var BulletinBorad = React.createClass({
		
		render : function () {
	
			var btns = [
							<a href={ ViBox.RESRC.url.web_mainPage }>
								<button className="btn-sty-0">Web App</button>
							</a>,
							<a href={ ViBox.RESRC.url.mobile_startPage }>
								<button className="btn-sty-1">Mobile App</button>
							</a>
					   ];
			
			if (ViBox.getIEVersion() <= 8) {
			
				var style = 'display: inline-block; text-align: center; text-decoration: none; color: #fff; font-weight: bold; width: 110px; height: 19px; padding: 8px 22px; margin-right: 8px;',
					blueBG = ' background-color: #3aaff2;',
					greenBG = ' background-color: #7ee55c;';
			
				btns = [
							<a
								href={ ViBox.RESRC.url.web_mainPage }
								style={ style + blueBG }
							>
								Web App
							</a>,
							<a
								href={ ViBox.RESRC.url.mobile_startPage }
								style={ style + greenBG }
							>
								Mobile App
							</a>
					   ];
			}			
			
			return (
				<div className="bulletinBoard">
				
					<div className="bulletinBoard-slideToggle lyt-none"></div>
					
					<div className="bulletinBoard-board lyt-pos-abs">
						
						<div className="bulletinBoard-logo"></div>
						
						<div className="bulletinBoard-article">
							<p>This site contains the web app mockup and the mobile app mockup of the ViBox. By look into these simple mockups, you will be able to grab the idea and the design concept of the ViBox.</p>
							<p>本站含有ViBox網頁版和手機板的mockup，這些mockup會簡單、清楚地展示ViBox的產品概念以及設計功能，透過瀏覽這些mockup將有助於快速建立對ViBox的了解。</p>
						</div>
						
						<div className="bulletinBoard-actionBtns">{btns}</div>
						
						<div className="bulletinBoard-remark">
							<a href={ ViBox.RESRC.url.proposal }>Proposal</a>
							<a href={ ViBox.RESRC.url.web_wireframe }>Web app wireframe</a>
							<a href={ ViBox.RESRC.url.mobile_wireframe }>Mobile app wireframe</a>
						</div>
						
					</div>
				</div>
			);
		}
	}); {
		
		/*	== The enhancement ==
			Properties:
				[ Private ]
				<OBJ> _className = the CSS class selector table
				<BOO> _slidable = a flag to record the slidable mode
				<ELM> _slideToggle = the .bulletinBoard-slideToggle element
			methods:
				> openSlide : Open the slide; only useful under the slidable mode
				> closeSlide : Close the slide; only useful under the slidable mode
		*/
		BulletinBorad.domEnhancer = function (bulletinBoard, data) {
		
			var _className = {
					slidable : "slidable",
					slidableOpen : "slidable-open",
					slideTogglePresent : "present"
				},
				_slidable = (ViBox.isObj(data) && data.slidable == true);
			
			var _slideToggle = bulletinBoard.querySelector(".bulletinBoard-slideToggle");
			
			bulletinBoard.openSlide = function () {
				if (_slidable) {
					ViBox.addClass(this, _className.slidableOpen);
					ViBox.addClass(_slideToggle, _className.slideTogglePresent);
				}
			}
			
			bulletinBoard.closeSlide = function () {
				if (_slidable) {
					ViBox.removeClass(this, _className.slidableOpen);
					setTimeout(function () { // Becaue we have the 1s CSS transition for opening/closing the bulletinBoard slide, delay here
						ViBox.removeClass(_slideToggle, _className.slideTogglePresent);
					}, 900);
				}
			}
			
			if (_slidable) {
					
				ViBox.addClass(bulletinBoard, _className.slidable);
				
				if (data.slidableOpen == true) {
					bulletinBoard.openSlide();
				}
				
				_slideToggle.onclick = function (e) {				
					if (ViBox.hasClass(this.parentNode, _className.slidableOpen)) {
						this.parentNode.closeSlide();
					} else {
						this.parentNode.openSlide();
					}				
				}
			}
			
			return bulletinBoard;
		}
	}
	
	ViBox.addModule("player", Player, Player.domEnhancer);
	ViBox.addModule("signupProcess", SignupProcess, SignupProcess.domEnhancer);
	ViBox.addModule("bulletinBoard", BulletinBorad, BulletinBorad.domEnhancer);
	
}(ViBox));
