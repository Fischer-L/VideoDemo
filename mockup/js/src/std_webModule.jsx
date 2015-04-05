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
							classNames : [ "signupProcess-in" ]
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
					
					arw = (this.props._render.noArw === true) ? null : (<div class="signupProcess-processBoard-arw"></div>),
					
					title = ViBox.isStr(this.props._render.title) ? this.props._render.title : null;
				return (
					<div className={ "signupProcess-processBoard-board" + renderHelpClassNames(this.props._render) }>
						{boardShadow}
						<div class="signupProcess-processBoard-title">{title}</div>
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
							(
								<h3>E-Mail</h3>
								<input name="signupProcess-actionForm-email" className="signupProcess-actionForm-email signupProcess-actionForm-longInput">
							),						
							(
								<h3>Passord</h3>
								<input name="signupProcess-actionForm-pw" className="signupProcess-actionForm-pw signupProcess-actionForm-longInput">
							),
							(
								<h3>Confirm passord</h3>
								<input name="signupProcess-actionForm-repw" className="signupProcess-actionForm-repw signupProcess-actionForm-longInput">						
							),
							(
								<span>Sign up to watch drama for free for 3 days !</span>
							),
							(						
								<button className="closeBtn btn-sty-2 sty-cursor-pter" type="button">Close</button>
								<button className="nextBtn btn-sty-1 sty-cursor-pter" type="button">Next</button>
							)
						]
					},
					
					finalBoard = {
						
						classNames : [ "signupProcess-final" ],
						
						boardShelfContents : [
							(
								<h3>Name</h3>
								<input name="signupProcess-actionForm-name" className="signupProcess-actionForm-email signupProcess-actionForm-longInput">
							),
							(
								<h3>Gender</h3>
								<label>
									<input name="signupProcess-actionForm-gender" className="signupProcess-actionForm-gender" type="radio" value="female" checked>Female
								</label>
								<label>
									<input name="signupProcess-actionForm-gender" className="signupProcess-actionForm-gender" type="radio" value="male">Male
								</label>
							),
							(
								<h3>Birthday</h3>
								<input name="signupProcess-actionForm-yy" className="signupProcess-actionForm-yy signupProcess-actionForm-shortInput" placeholder="yyyy" maxlength="4">
								<span className="actionForm-boardShelf-spacer lyt-inlineBlock"></span>
								<input name="signupProcess-actionForm-mm" className="signupProcess-actionForm-mm signupProcess-actionForm-shortInput" placeholder="mm" maxlength="2">
								<span className="actionForm-boardShelf-spacer lyt-inlineBlock"></span>
								<input name="signupProcess-actionForm-dd" className="signupProcess-actionForm-dd signupProcess-actionForm-shortInput" placeholder="dd" maxlength="2">
							),
							(
								<span>Go watching your favorite drama !</span>
							),
							(
								<button className="closeBtn btn-sty-2 sty-cursor-pter" type="button">Colse</button>
								<button className="submitBtn btn-sty-1 sty-cursor-pter" type="button">Watch drama</button>
							)
						]
					};			
				
				retunr (
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
					<ARR<ReactElement>> boardShelfContents = the array of React elements which is being used as content inside shelf.
		*/
		SignupProcess.ActionForm.Board = React.createClass({
			
			render : function () {
			
				var boardShelfs = null;
				
				if (Vibox.isArr(this.props._render.boardShelfContents)) {
					
					var i,
						relem,
						relems = this.props._render.boardShelfContents;
					
					boardShelfs = [];
					
					for (i = 0; i < relems.length ; i++) {
						
						relem = relems[i];
						
						if (React.isValidElement(relem)) {
						
							boardShelfs.push((
								<div class="signupProcess-actionForm-boardShelf">{relem}</div>
							));
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

	// TODO: Player class
	
	var BulletinBorad = React.createClass({
		
		render : function () {
	
			var btns = (<a href={ ViBox.RESRC.url.web_mainPage }>
							<button className="btn-sty-0">Web App</button>
						</a>
						<a href={ ViBox.RESRC.url.mobile_startPage }>
							<button className="btn-sty-1">Mobile App</button>
						</a>);
			
			if (ViBox.getIEVersion() <= 8) {
			
				var style = 'display: inline-block; text-align: center; text-decoration: none; color: #fff; font-weight: bold; width: 110px; height: 19px; padding: 8px 22px; margin-right: 8px;',
					blueBG = ' background-color: #3aaff2;',
					greenBG = ' background-color: #7ee55c;';
			
				btns = (<a
							href={ ViBox.RESRC.url.web_mainPage }
							style={ style + blueBG }
						>
							Web App
						</a>
						<a
							href={ ViBox.RESRC.url.mobile_startPage }
							style={ style + greenBG }
						>
							Mobile App
						</a>);
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
	
	ViBox.addModule("signupProcess", SignupProcess, SignupProcess.domEnhancer);
	ViBox.addModule("bulletinBoard", BulletinBorad, BulletinBorad.domEnhancer);
	
}(ViBox));