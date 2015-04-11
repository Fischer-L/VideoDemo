/**
 * The browser compatibility
 */
if(!Array.prototype.forEach){Array.prototype.forEach=function(callback,thisArg){var T,k;if(this==null){throw new TypeError(" this is null or not defined");}var O=Object(this);var len=O.length>>>0;if(typeof callback!=="function"){throw new TypeError(callback+" is not a function");}if(thisArg){T=thisArg}k=0;while(k<len){var kValue;if(k in O){kValue=O[k];callback.call(T,kValue,k,O)}k++}}}
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(searchElement,fromIndex){if(this===undefined||this===null){throw new TypeError('"this" is null or not defined');}var length=this.length>>>0;fromIndex=+fromIndex||0;if(Math.abs(fromIndex)===Infinity){fromIndex=0}if(fromIndex<0){fromIndex+=length;if(fromIndex<0){fromIndex=0}}for(;fromIndex<length;fromIndex++){if(this[fromIndex]===searchElement){return fromIndex}}return-1}}
if (!String.prototype.trim) {String.prototype.trim = function () {return this.replace(/^\s+|\s+$/g, '');};}
/**
 *	The ViBox Stuff
 */
/*	Properties:
		[ Private ]
		<STR> _domain = the domain
		<OBJ> _modules = the table of web modules.
		<CLS> _cls_ModuleMaker = the class in charge of making web module
		[ Public ]
		<OBJ> RESRC = the reosurces
		<INF> inf_DomMaker:
		      * Func: Make one web module
			  * Arg:
					<OBJ> [data] = the data to use as making module
			  * Return:
					@ OK: <STR> the html text | <ELM> the HTML element
					@ NG: null
		<INF> inf_DomEnhancer:
		      * Func: Do some extra customized work web module, such as add methods, append child element an so on...
			  * Arg:
					<ELM> module = the module obj
					<OBJ> [data] = the data to use as enhancing module
			  * Return:
					@ OK: <ELM> the enhanced module
					@ NG: null
	Methods:
		[ Private ]
		> _html2dom : Convert the HTML text into the real HTML element
		[ public ]
		> getIEVersion : Get the IR version
		> simpleCopy : Make a simple copy of one obj. So-called simple copy is to copy String/Number/Bool/NULL/Undefined property only and ignore, no care of Date, Funciton or other recursive ot special state handling.
		> isDBG : Tell if in the DBG mode
		> isStr, isFunc, isObj, isHTMLElem, isArr, isDate : Check the corresponding data type
		> hasClass : Find out if the specified CSS classes exist in the target element's className attribute
		> addClass : Add some CSS classes into one element's className attribute
		> removeClass : Remoce some CSS classes from one element's className attribute
		> addEvt : Add event to one element with the extra care for the cross browser compatibility handle
		> normalizeEvent : Nomalize the event obj for cross-browser compatibility
		> addModule : Add one web module
		> newModule : Make an new module from the type added before.
*/
var ViBox = (function () {
		
		var _DBG = !VIBOX_DBG ? false : true;
		
		var _domain = VIBOX_ROOT || 'http://fischerliu.net63.net/viboxdemo';
		
		/*	Properties:
				[ Public ]
				<OBJ> The instance of ViBox::_cls_ModuleMaker. The property name is module id.
		*/
		var _modules = {};
		
		/*	Properties:
				[ Public ]
				<STR> id = the identifier of web module
			Methods:
				[ Public ]
				> domMaker : Shall implement the ViBox::inf_DomMaker interface
				> [domEnhancer] : Optional, but shall implement the ViBox::inf_DomEnhancer interface as present
		*/
		function _cls_ModuleMaker(moduleID, domMaker, domEnhancer) {
			this.id = moduleID;
			this.domMaker = domMaker;
			this.domEnhancer = ViBox.isFunc(domEnhancer) ? domEnhancer : null;
		}
		
		/*	Arg:
				<STR> html = the HTML text
			Return:
				@ OK: <ELM> HTML element
				@ NG: null
		*/
		function _html2dom(html) {
			if (ViBox.isStr(html)) {
				var tmp = document.createElement("DIV");
				tmp.innerHTML = html;
				return tmp.firstChild.cloneNode(true);
			}
			return null;
		}
		
	return {
		RESRC : {
			url : {		
				jpDramaPoster  : _domain + "/img/hanzawa_L.jpg",
				korDramaPoster : _domain + "/img/you_from_star_L.jpg",
				twDramaPoster  : _domain + "/img/love_myself_L.jpg",
				cnDramaPoster  : _domain + "/img/lianlinking_L.jpg",
				usDramaPoster  : _domain + "/img/game_of_thrones_L.jpg",
				web_mainPage : _domain + "/webapp/main.php",
				mobile_mainPage : _domain + "/mobileapp/main.php",
				mobile_startPage : _domain + "/mobileapp/start.php",
				mobile_dramaPage : _domain + "/mobileapp/drama.php",
				mobile_playerPage : _domain + "/mobileapp/player.php",
				mobile_signupPage : _domain + "/mobileapp/signup.php",
				proposal : _domain + "/img/vibox_proposal.pdf",
				web_wireframe : _domain + "/img/vibox_web_app_wireframe.jpg",
				mobile_wireframe : _domain + "/img/vibox_mobile_app_wireframe.jpg"
			}
		},
		/*  Return:
				@ Is IE: <NUM> the version of IE
				@ Not IE: NaN
		*/
		getIEVersion : function () {
			var rv = -1; // Return value assumes failure.
			if (navigator.appName == 'Microsoft Internet Explorer') {
				var ua = navigator.userAgent;
				var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
				if (re.exec(ua) != null) {
					rv = +(RegExp.$1);
				}
			}
			return (rv === -1) ? NaN : rv;
		},
		/*	Arg:
				<OBJ> src = the copy src obj
			Return:
				@ OK: the copy obj
				@ NG: null
		*/
		simpleCopy : function (srcObj) {
			return this.isObj(srcObj) ? JSON.parse(JSON.stringify(srcObj)) : null;
		},
		/*	Return:
				@ DBG: true
				@ Not DBG: false
		*/
		isDBG : function () {
			return _DBG;
		},
		/*	Arg:
				<*> target = the target to test
			Return:
				@ OK: true
				@ NG: false
		*/
		isStr : function (target) {
			return (typeof target == "string");
		},
		/*	Arg:
				<*> target = the target to test
			Return:
				@ OK: true
				@ NG: false
		*/
		isFunc : function (target) {
			return (typeof target == "function");
		},
		/*	Arg:
				<*> target = the target to test
			Return:
				@ OK: true
				@ NG: false
		*/		
		isObj : function (target) {
			return (target instanceof Object);
		},
		/*	Arg:
				<*> target = the target to test
			Return:
				@ OK: true (text node is counted as well)
				@ NG: false
		*/		
		isHTMLElem : function (target) {
			return (   target
					&& typeof target == "object"
					&& typeof target.nodeType == "number"
					&& (target.nodeType === 1 || target.nodeType === 3)
				   );
		},
		/*	Arg:
				<*> target = the target to test
			Return:
				@ OK: true
				@ NG: false
		*/	
		isArr : function (target) {
			return (target instanceof Array);
		},
		/*	Arg:
				<*> target = the target to test
			Return:
				@ OK: true
				@ NG: false
		*/	
		isDate : function (target) {
			return (target instanceof Date);
		},
		/*	Arg:
				<STR|ELM> target = the test target, could be the class of dom element or the dom element
				<STR|ARR> className = classes to test in a string seperated by " " or in an array
			Return:
				@ Having: true
				@ Not having: false
		*/
		hasClass : function (target, className) {
			var has = false,
				elemClass = this.isHTMLElem(target) ? target.className : target;
			
			if (typeof elemClass == "string" && elemClass) {
				
				className = (typeof className == "string") ? className.split(" ") : className;
				
				if (className instanceof Array) {
				
					has = true;
					elemClass = " " + elemClass + " ";	
					
					for (var i = 0; i < className.length; i++) {
						if (typeof className[i] == "string") {
							if (elemClass.search(" " + className[i] + " ") < 0) {
								has = false;
								break;
							}
						}
					}
				}
			}
			return has;
		},		
		/*	Arg:
				<ELM> elem = the target element which is being added classes
				<STR|ARR> newClasseses = the new classes to add, if multiple, seperated by " " or put in an array
			Return:
				>	OK: the newly added classes in an array
				>	NG: false
		*/
		addClass : function (elem, newClasses) {
			var addedClasses = [],
				thisClass = elem.className;
				
			newClasses = this.isStr(newClasses) ? newClasses.split(" ") : newClasses;
			
			if (this.isArr(newClasses)) {
				for (var i = 0, j = newClasses.length; i < j; i++) {
					if (!this.hasClass(thisClass, newClasses[i]) ) {
						thisClass += " " + newClasses[i];
						addedClasses.push(newClasses[i]);
					}
				}
			}
			
			if (addedClasses.length > 0) {
				elem.className = thisClass.trim();
				return addedClasses;
			} else {
				return false;
			}
		},
		/*	Arg:
				<ELM> elem = the target element whose classes are being removed
				<STR|ARR> classes = the classes to remove, if multiple, seperated by " " or put in an array
			Return:
				>	OK: the removed classes in an array
				>	NG: false
		*/
		removeClass : function (elem, classes) {
			var removedClasses = [];
				thisClass = " " + elem.className + " ";
			
			classes = this.isStr(classes) ? classes.split(" ") : classes;
			
			if (this.isArr(classes)) {
				for (var i = 0, j = classes.length; i < j; i++) {
					if (this.hasClass(thisClass, classes[i]) ) {
						thisClass = thisClass.replace(" " + classes[i] + " ", " ");
						removedClasses.push(classes[i]);
					}
				}
			}

			if (removedClasses.length > 0) {
				elem.className = thisClass.trim();
				return removedClasses;
			} else {
				return false;
			}
		},
		/*	Arg:
				<ELM> elem = the elem to which the event is being added
				<STR> evt = the event name, like "click" for the onclick event
				<FN> eHandle = the event handler				
		*/
		addEvt : function (elem, evt, eHandle) {
			var that = this,
				proxyHandle = function (e) {
					eHandle.call(elem, that.normalizeEvent(e));
				};
			if (elem.addEventListener) {
				elem.addEventListener(evt, proxyHandle);
			} else if (elem.attachEvent) { // The IE 8 case
				elem.attachEvent("on" + evt, proxyHandle);
			}
		},
		/*	Arg: 
				<OBJ> e = the event object
			Return:
				<OBJ> The normalized event
		*/
		normalizeEvent : function (e) {
		
			// Cope with the cross browser compatibility
			
			if (!e) e = window.event;
			
			if(!e.target) e.target = e.srcElement;
			
			e.stopBubble = function () {
				this.cancelBubble = true;
				if (this.stopPropoagation) { this.stopPropoagation(); }
			}
			
			e.stopDefault = function () {
				if (this.preventDefault) { this.preventDefault(); }
				this.returnValue = false;
				return false;
			}
			return e;
		},
		/*	Arg:
				> moduleID, domMaker, domEnhancer = Refer to the constructor of ViBox::_cls_ModuleMaker
		*/
		addModule : function (moduleID, domMaker, domEnhancer) {
		
if (this.isDBG()) return this.exp_addModule(moduleID, domMaker, domEnhancer);
		
			if (   moduleID
				&& this.isStr(moduleID)
			    && this.isFunc(domMaker)
			) {
				_modules[moduleID] = new _cls_ModuleMaker(moduleID, domMaker, domEnhancer);
			}
		},
		/*	Arg:
				<STR> moduleID = the identifier of the module to new
				> data = Refer to ViBox::inf_DomMaker & ViBox::inf_DomEnhancer
			Return:
				@ OK: <ELM> the web module
				@ NG: false
		*/
		newModule : function (moduleID, data) {
		
if (this.isDBG()) return this.exp_newModule(moduleID, data);
		
			if (   this.isStr(moduleID)
				&& _modules[moduleID] instanceof _cls_ModuleMaker
			) {
				var module = _modules[moduleID].domMaker(data);
				
				module = this.isStr(module) ? _html2dom(module) : this.isHTMLElem(module) ? module : null;
				
				if (module && _modules[moduleID].domEnhancer) {
					module = _modules[moduleID].domEnhancer(module, data);
				}
				
				return this.isHTMLElem(module) ? module : null;
			}
			return null;
		},
		
		exp_addModule : function (moduleID, domMaker, domEnhancer) {		
			if (   moduleID
				&& this.isStr(moduleID)
			    && (this.isFunc(domMaker) || this.exp_reactHelp.isReactClass(domMaker))
			) {
				_modules[moduleID] = new _cls_ModuleMaker(moduleID, domMaker, domEnhancer);
			}		
		},
		exp_newModule : function (moduleID, data) {
			
			var module = null;
			
			if (   this.isStr(moduleID)
				&& _modules[moduleID] instanceof _cls_ModuleMaker
			) {
				
				if (this.exp_reactHelp.isReactClass(_modules[moduleID].domMaker)) {
				
					module = React.renderToStaticMarkup(React.createElement(_modules[moduleID].domMaker, { _render : data }));	
					
				} else {
				
					module = _modules[moduleID].domMaker(data);
				}
				
				module = this.isStr(module) ? _html2dom(module) : this.isHTMLElem(module) ? module : null;
				
				if (module && _modules[moduleID].domEnhancer) {
					module = _modules[moduleID].domEnhancer(module, data);
				}				
			}
			
			return this.isHTMLElem(module) ? module : null;
		},
		exp_reactHelp : {
			
			isReactClass : function (target) {
				return ViBox.isFunc(target) && ViBox.isObj(target.prototype) && ViBox.isFunc(target.prototype.getDOMNode);
			},
	
			/*	Func:
					Help constructing the string of css class selectors from the rendering param
				Arg:
					> src = could be 2 types:
						<ARR<STR>> the array of css classes being applied or
						<OBJ> the obj holding the properpty of <ARR<STR>> classNames. This classNames property is equal to the 1st type.
				Return:
					@ OK: A string of css class selectors which is ready to be appended
					@ NG: ""
			*/
			function renderClassNames(src) {
				
				var clsNames = ViBox.isObj(src) ? src.classNames : src;
				
				if (ViBox.isArr(clsNames)) { 
					
					for (var i = clsNames.length - 1; i >= 0; i--) {				
						if (!ViBox.isStr(clsNames[i])) clsNames.pop();
					}
					
					if (clsNames.length <= 0) clsNames = null;
					
				} else {
					
					clsNames = null;
				}
				
				return !ViBox.isArr(clsNames) ? "" : " " + clsNames.join(" ");
			}			
		}
	};
}());

ViBox.addModule("To Delete signupProcess",
	function (data) {
		var html =	 '<div class="signupProcess">'
					+	'<div class="signupProcess-processBoard">'
					+		'<div class="signupProcess-processBoard-board signupProcess-end">'
					+			'<div class="signupProcess-processBoard-title">Watch drama</div>'
					+		'</div>'
					+		'<div class="signupProcess-processBoard-board signupProcess-final">'
					+			'<div class="signupProcess-processBoard-boardShadow">'
					+				'<div class="signupProcess-processBoard-title"></div>'
					+				'<div class="signupProcess-processBoard-arw"></div>'
					+			'</div>'
					+			'<div class="signupProcess-processBoard-title">Fill info</div>'
					+			'<div class="signupProcess-processBoard-arw"></div>'
					+		'</div>'
					+		'<div class="signupProcess-processBoard-board signupProcess-start signupProcess-in">'
					+			'<div class="signupProcess-processBoard-boardShadow">'
					+				'<div class="signupProcess-processBoard-title"></div>'
					+				'<div class="signupProcess-processBoard-arw"></div>'
					+			'</div>'
					+			'<div class="signupProcess-processBoard-title">Add account</div>'
					+			'<div class="signupProcess-processBoard-arw"></div>'
					+		'</div>'
					+		'<div class="clear"></div>'
					+	'</div>'
					+	'<form name="signupProcess-actionForm" class="signupProcess-actionForm lyt-pos-rel">'
					+		'<div class="signupProcess-actionForm-board signupProcess-start">'
					+			'<div class="signupProcess-actionForm-boardShelf">'
					+				'<h3>E-Mail</h3>'
					+				'<input name="signupProcess-actionForm-email" class="signupProcess-actionForm-email signupProcess-actionForm-longInput">'
					+			'</div>'
					+			'<div class="signupProcess-actionForm-boardShelf">'
					+				'<h3>Passord</h3>'
					+				'<input name="signupProcess-actionForm-pw" class="signupProcess-actionForm-pw signupProcess-actionForm-longInput">'
					+			'</div>'
					+			'<div class="signupProcess-actionForm-boardShelf">'							
					+				'<h3>Confirm passord</h3>'
					+				'<input name="signupProcess-actionForm-repw" class="signupProcess-actionForm-repw signupProcess-actionForm-longInput">'
					+			'</div>'
					+			'<div class="signupProcess-actionForm-boardShelf">'							
					+				'Sign up to watch drama for free for 3 days !'
					+			'</div>'
					+			'<div class="signupProcess-actionForm-boardShelf">'							
					+				'<button class="closeBtn btn-sty-2 sty-cursor-pter" type="button">Close</button>'
					+				'<button class="nextBtn btn-sty-1 sty-cursor-pter" type="button">Next</button>'
					+			'</div>'
					+		'</div>'
					+		'<div class="signupProcess-actionForm-board signupProcess-final">'
					+			'<div class="signupProcess-actionForm-boardShelf">'
					+				'<h3>Name</h3>'
					+				'<input name="signupProcess-actionForm-name" class="signupProcess-actionForm-email signupProcess-actionForm-longInput">'
					+			'</div>'
					+			'<div class="signupProcess-actionForm-boardShelf">'								
					+				'<h3>Gender</h3>'
					+				'<label>'
					+					'<input name="signupProcess-actionForm-gender" class="signupProcess-actionForm-gender" type="radio" value="female" checked>Female'
					+				'</label>'
					+				'<label>'
					+					'<input name="signupProcess-actionForm-gender" class="signupProcess-actionForm-gender" type="radio" value="male">Male'
					+				'</label>'
					+			'</div>'
					+			'<div class="signupProcess-actionForm-boardShelf">'	
					+				'<h3>Birthday</h3>'
					+				'<input name="signupProcess-actionForm-yy" class="signupProcess-actionForm-yy signupProcess-actionForm-shortInput" placeholder="yyyy" maxlength="4">'
					+				'<span class="actionForm-boardShelf-spacer lyt-inlineBlock"></span>'
					+				'<input name="signupProcess-actionForm-mm" class="signupProcess-actionForm-mm signupProcess-actionForm-shortInput" placeholder="mm" maxlength="2">'
					+				'<span class="actionForm-boardShelf-spacer lyt-inlineBlock"></span>'
					+				'<input name="signupProcess-actionForm-dd" class="signupProcess-actionForm-dd signupProcess-actionForm-shortInput" placeholder="dd" maxlength="2">'
					+			'</div>'
					+			'<div class="signupProcess-actionForm-boardShelf">'	
					+				'Go watching your favorite drama !'
					+			'</div>'
					+			'<div class="signupProcess-actionForm-boardShelf">'								
					+				'<button class="closeBtn btn-sty-2 sty-cursor-pter" type="button">Colse</button>'
					+				'<button class="submitBtn btn-sty-1 sty-cursor-pter" type="button">Watch drama</button>'
					+			'</div>'
					+		'</div>'
					+		'<div class="clear"></div>'
					+	'</form>'
					+'</div>';
		return html;
	},	
	function (elem) {
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
	}
);

ViBox.addModule("To Delete player",
	/*	Arg:
			<OBJ> data = {
				<ELM> player : the player DOM element
			}
	*/
	function (data) {
		return data.player;
	},
	function (player) {
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
);

ViBox.addModule("To Delete bulletinBoard",
	/*	Arg:
			<OBJ> data = {
				<BOO> [slidable] = Enable the slidable mode
				<BOO> [slidableOpen] = Open the slide; only valid under the slidable mode
			}
	*/
	function (data) {
	
		var btns = 	 '<a href="' + ViBox.RESRC.url.web_mainPage + '">'
					+	'<button class="btn-sty-0">Web App</button>'
					+'</a>'
					+'<a href="' + ViBox.RESRC.url.mobile_startPage + '">'
					+	'<button class="btn-sty-1">Mobile App</button>'
					+'</a>';
		
		if (ViBox.getIEVersion() <= 8) {
			
			var style = 'display: inline-block; text-align: center; text-decoration: none; color: #fff; font-weight: bold; width: 110px; height: 19px; padding: 8px 22px; margin-right: 8px;',
				blueBG = ' background-color: #3aaff2;',
				greenBG = ' background-color: #7ee55c;';
			
			btns = 	 '<a'
					+	' href="' + ViBox.RESRC.url.web_mainPage + '"'
					+	' style="' + style + blueBG + '"'
					+'>'
					+	'Web App'
					+'</a>'
					+'<a'
					+ ' href="' + ViBox.RESRC.url.mobile_startPage + '"'
					+	' style="' + style + greenBG + '"'
					+'>'
					+	'Mobile App'
					+'</a>'
		}
					
		var html =	'<div class="bulletinBoard">'
					+	'<div class="bulletinBoard-slideToggle lyt-none"></div>'
					+	'<div class="bulletinBoard-board lyt-pos-abs">'
					+		'<div class="bulletinBoard-logo"></div>'
					+		'<div class="bulletinBoard-article">'
					+			'<p>'
					+				'This site contains the web app mockup and the mobile app mockup of the ViBox. By look into these simple mockups, you will be able to grab the idea and the design concept of the ViBox.'
					+			'</p>'
					+			'<p>'
					+				'本站含有ViBox網頁版和手機板的mockup，這些mockup會簡單、清楚地展示ViBox的產品概念以及設計功能，透過瀏覽這些mockup將有助於快速建立對ViBox的了解。'
					+			'</p>'
					+		'</div>'
					+		'<div class="bulletinBoard-actionBtns">' + btns + '</div>'
					+		'<div class="bulletinBoard-remark">'
					+			'<a href="' + ViBox.RESRC.url.proposal + '">Proposal</a>'
					+			'<a href="' + ViBox.RESRC.url.web_wireframe + '">Web app wireframe</a>'
					+			'<a href="' + ViBox.RESRC.url.mobile_wireframe + '">Mobile app wireframe</a>'
					+		'</div>'
					+	'</div>'
					+'</div>';
		
		return Mustache.render(html);
	},
	function (bulletinBoard, data) {
	/*	Properties:
			[ Private ]
			<OBJ> _className = the CSS class selector table
			<BOO> _slidable = a flag to record the slidable mode
			<ELM> _slideToggle = the .bulletinBoard-slideToggle element
		methods:
			> openSlide : Open the slide; only useful under the slidable mode
			> closeSlide : Close the slide; only useful under the slidable mode
	*/
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
);
