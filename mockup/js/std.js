/**
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
(function(global,factory){if(typeof exports==="object"&&exports){factory(exports)}else if(typeof define==="function"&&define.amd){define(['exports'],factory)}else{factory(global.Mustache={})}}(this,function(mustache){var Object_toString=Object.prototype.toString;var isArray=Array.isArray||function(object){return Object_toString.call(object)==='[object Array]'};function isFunction(object){return typeof object==='function'}function escapeRegExp(string){return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}var RegExp_test=RegExp.prototype.test;function testRegExp(re,string){return RegExp_test.call(re,string)}var nonSpaceRe=/\S/;function isWhitespace(string){return!testRegExp(nonSpaceRe,string)}var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':'&quot;',"'":'&#39;',"/":'&#x2F;'};function escapeHtml(string){return String(string).replace(/[&<>"'\/]/g,function(s){return entityMap[s]})}var whiteRe=/\s*/;var spaceRe=/\s+/;var equalsRe=/\s*=/;var curlyRe=/\s*\}/;var tagRe=/#|\^|\/|>|\{|&|=|!/;function parseTemplate(template,tags){if(!template)return[];var sections=[];var tokens=[];var spaces=[];var hasTag=false;var nonSpace=false;function stripSpace(){if(hasTag&&!nonSpace){while(spaces.length)delete tokens[spaces.pop()]}else{spaces=[]}hasTag=false;nonSpace=false}var openingTagRe,closingTagRe,closingCurlyRe;function compileTags(tags){if(typeof tags==='string')tags=tags.split(spaceRe,2);if(!isArray(tags)||tags.length!==2)throw new Error('Invalid tags: '+tags);openingTagRe=new RegExp(escapeRegExp(tags[0])+'\\s*');closingTagRe=new RegExp('\\s*'+escapeRegExp(tags[1]));closingCurlyRe=new RegExp('\\s*'+escapeRegExp('}'+tags[1]))}compileTags(tags||mustache.tags);var scanner=new Scanner(template);var start,type,value,chr,token,openSection;while(!scanner.eos()){start=scanner.pos;value=scanner.scanUntil(openingTagRe);if(value){for(var i=0,valueLength=value.length;i<valueLength;++i){chr=value.charAt(i);if(isWhitespace(chr)){spaces.push(tokens.length)}else{nonSpace=true}tokens.push(['text',chr,start,start+1]);start+=1;if(chr==='\n')stripSpace()}}if(!scanner.scan(openingTagRe))break;hasTag=true;type=scanner.scan(tagRe)||'name';scanner.scan(whiteRe);if(type==='='){value=scanner.scanUntil(equalsRe);scanner.scan(equalsRe);scanner.scanUntil(closingTagRe)}else if(type==='{'){value=scanner.scanUntil(closingCurlyRe);scanner.scan(curlyRe);scanner.scanUntil(closingTagRe);type='&'}else{value=scanner.scanUntil(closingTagRe)}if(!scanner.scan(closingTagRe))throw new Error('Unclosed tag at '+scanner.pos);token=[type,value,start,scanner.pos];tokens.push(token);if(type==='#'||type==='^'){sections.push(token)}else if(type==='/'){openSection=sections.pop();if(!openSection)throw new Error('Unopened section "'+value+'" at '+start);if(openSection[1]!==value)throw new Error('Unclosed section "'+openSection[1]+'" at '+start);}else if(type==='name'||type==='{'||type==='&'){nonSpace=true}else if(type==='='){compileTags(value)}}openSection=sections.pop();if(openSection)throw new Error('Unclosed section "'+openSection[1]+'" at '+scanner.pos);return nestTokens(squashTokens(tokens))}function squashTokens(tokens){var squashedTokens=[];var token,lastToken;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];if(token){if(token[0]==='text'&&lastToken&&lastToken[0]==='text'){lastToken[1]+=token[1];lastToken[3]=token[3]}else{squashedTokens.push(token);lastToken=token}}}return squashedTokens}function nestTokens(tokens){var nestedTokens=[];var collector=nestedTokens;var sections=[];var token,section;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];switch(token[0]){case'#':case'^':collector.push(token);sections.push(token);collector=token[4]=[];break;case'/':section=sections.pop();section[5]=token[2];collector=sections.length>0?sections[sections.length-1][4]:nestedTokens;break;default:collector.push(token)}}return nestedTokens}function Scanner(string){this.string=string;this.tail=string;this.pos=0}Scanner.prototype.eos=function(){return this.tail===""};Scanner.prototype.scan=function(re){var match=this.tail.match(re);if(!match||match.index!==0)return'';var string=match[0];this.tail=this.tail.substring(string.length);this.pos+=string.length;return string};Scanner.prototype.scanUntil=function(re){var index=this.tail.search(re),match;switch(index){case-1:match=this.tail;this.tail="";break;case 0:match="";break;default:match=this.tail.substring(0,index);this.tail=this.tail.substring(index)}this.pos+=match.length;return match};function Context(view,parentContext){this.view=view==null?{}:view;this.cache={'.':this.view};this.parent=parentContext}Context.prototype.push=function(view){return new Context(view,this)};Context.prototype.lookup=function(name){var cache=this.cache;var value;if(name in cache){value=cache[name]}else{var context=this,names,index;while(context){if(name.indexOf('.')>0){value=context.view;names=name.split('.');index=0;while(value!=null&&index<names.length)value=value[names[index++]]}else{value=context.view[name]}if(value!=null)break;context=context.parent}cache[name]=value}if(isFunction(value))value=value.call(this.view);return value};function Writer(){this.cache={}}Writer.prototype.clearCache=function(){this.cache={}};Writer.prototype.parse=function(template,tags){var cache=this.cache;var tokens=cache[template];if(tokens==null)tokens=cache[template]=parseTemplate(template,tags);return tokens};Writer.prototype.render=function(template,view,partials){var tokens=this.parse(template);var context=(view instanceof Context)?view:new Context(view);return this.renderTokens(tokens,context,partials,template)};Writer.prototype.renderTokens=function(tokens,context,partials,originalTemplate){var buffer='';var self=this;function subRender(template){return self.render(template,context,partials)}var token,value;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];switch(token[0]){case'#':value=context.lookup(token[1]);if(!value)continue;if(isArray(value)){for(var j=0,valueLength=value.length;j<valueLength;++j){buffer+=this.renderTokens(token[4],context.push(value[j]),partials,originalTemplate)}}else if(typeof value==='object'||typeof value==='string'){buffer+=this.renderTokens(token[4],context.push(value),partials,originalTemplate)}else if(isFunction(value)){if(typeof originalTemplate!=='string')throw new Error('Cannot use higher-order sections without the original template');value=value.call(context.view,originalTemplate.slice(token[3],token[5]),subRender);if(value!=null)buffer+=value}else{buffer+=this.renderTokens(token[4],context,partials,originalTemplate)}break;case'^':value=context.lookup(token[1]);if(!value||(isArray(value)&&value.length===0))buffer+=this.renderTokens(token[4],context,partials,originalTemplate);break;case'>':if(!partials)continue;value=isFunction(partials)?partials(token[1]):partials[token[1]];if(value!=null)buffer+=this.renderTokens(this.parse(value),context,partials,value);break;case'&':value=context.lookup(token[1]);if(value!=null)buffer+=value;break;case'name':value=context.lookup(token[1]);if(value!=null)buffer+=mustache.escape(value);break;case'text':buffer+=token[1];break}}return buffer};mustache.name="mustache.js";mustache.version="0.8.1";mustache.tags=["{{","}}"];var defaultWriter=new Writer();mustache.clearCache=function(){return defaultWriter.clearCache()};mustache.parse=function(template,tags){return defaultWriter.parse(template,tags)};mustache.render=function(template,view,partials){return defaultWriter.render(template,view,partials)};mustache.to_html=function(template,view,partials,send){var result=mustache.render(template,view,partials);if(isFunction(send)){send(result)}else{return result}};mustache.escape=escapeHtml;mustache.Scanner=Scanner;mustache.Context=Context;mustache.Writer=Writer}));
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
		/*  Func: Get the version of IE
			Return:
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
		}
	};
}());

ViBox.addModule("signupProcess",
	/*	Arg:
			<OBJ> data = {
				<ARR> startActionFormElemsHTML = the array of html texts. Each html is one signup form element for the start process inside one div.signupProcess-actionForm-boardShelf 
				<ARR> finalActionFormElemsHTML = Like the startActionFormElemsHTML arg but is for the final process
			}
	*/
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

ViBox.addModule("player",
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

ViBox.addModule("bulletinBoard",
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
