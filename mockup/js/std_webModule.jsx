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
			
			
			
			retunr (
				<div className="bulletinBoard">
				
				</div>
			);
		}
	});
	
}(ViBox));