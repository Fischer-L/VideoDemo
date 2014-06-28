/*	Func: Kind of like the task and back state of the Android
	Properties:
		[ Private ]
		<ARR> _taskStack = the task functions stack
	Methods:
		[ Public ]
		> push : Push one task to the stack
		> pop : Pop out one stack and run that task
*/
ViBox.taskStack = (function () {
	
	var _taskStack = [];
	
return {
	/*	Arg:
			<FN> task = the task function
	*/
	push : function (task) {
		if (ViBox.isFunc(task)) {
			_taskStack.push(task);
		}
	},
	/*	Return:
			<*> Depends on the executed task
	*/
	pop : function () {
		if (_taskStack.length > 0) {
			return _taskStack.pop()();
		}
	}
};	
}());

ViBox.addModule("header",
	/*	Arg:
			<OBJ> data = {
				<ELM> header = the header element
				<STR> title = the header title
				> [navMode] = the navigation mode. Refer to the below enhancement method, useNavMode, for the valid modes
			}
	*/
	function (data) {
		return data.header;
	},
	function (header, data) {		
		
		var _className = {
				navModes : [ "backNav", "menuNav", "searchNav" ],
				backBtn : "header-navBtn-backBtn",
				headerMenu : "header-menu",
				menuBtn : "header-navBtn-menuBtn",
				menuPresent : "present",
				srchPresent : "present",
				srchNav : "header-nav-search",
				srchBtn : "header-navBtn-searchBtn"
			};
		
		var _srchNav = header.querySelector("." + _className.srchNav),
			_headerMenu = header.querySelector("." + _className.headerMenu);		
		
		header.setTitle = function (title) {
		
			var headerTitle = this.querySelector(".header-nav-title");
			
			if (ViBox.isStr(title)) {
				headerTitle.innerHTML = title;
			}
			
			return headerTitle.innerHTML;
		}
		
		header.setNavMode = function (mode) {
			
			var modes = [],
				arr = ViBox.isArr(mode) ? mode : [mode];
			
			arr.forEach(function (mode, idx, arr) {
				if (_className.navModes.indexOf(mode) >= 0) {
					modes.push(mode);
				}
			});
			
			if (modes.length > 0) {
				ViBox.removeClass(this, _className.navModes);
				ViBox.addClass(this, modes);
			}
		}
		
		header.openMenu = function () {
			ViBox.addClass(_headerMenu, _className.menuPresent);
		}
		
		header.closeMenu = function () {
			ViBox.removeClass(_headerMenu, _className.menuPresent);		
		}
		
		header.openSearch = function () {
			ViBox.addClass(_srchNav, _className.srchPresent);			
		}
		
		header.closeSearch = function () {
			ViBox.removeClass(_srchNav, _className.srchPresent);	
		}
		
		/*
		 * Add events
		 */
		ViBox.addEvt(header, "click", function (e) {
			
			if (ViBox.hasClass(e.target, _className.backBtn)) {
			// When clicking the navigation back btn, pop out one task to go back to the previous state
				ViBox.taskStack.pop();
				
			} else if (ViBox.hasClass(e.target, _className.menuBtn)
					|| ViBox.hasClass(e.target.parentNode, _className.menuBtn)
					|| ViBox.hasClass(e.target, _className.headerMenu)
					|| ViBox.hasClass(e.target.parentNode, _className.headerMenu)
			) {
				if (ViBox.hasClass(_headerMenu, _className.menuPresent)) {
				// When the menu is open, clicking the menuBtn or the menu is to close the menu
					this.closeMenu();
				} else {
				// When the menu is closed, clicking the menuBtn or the menu is to open the menu
					this.openMenu();
				}			
			} else if (ViBox.hasClass(e.target, _className.srchBtn)) {
				if (ViBox.hasClass(_srchNav, _className.srchPresent)) {
				// When the search navigation section is open, clicking the srchBtn is to close the menu
					this.closeSearch();
				} else {
				// When the search navigation section is closed, clicking the srchBtn is to open the menu
					this.openSearch();
				}				
			}
			
		});
		
		/*
		 * Config according to the input data
		 */
		if (ViBox.isObj(data)) {
			header.setTitle(data.title);
			header.setNavMode(data.navMode);
		}
		
		return header;
	}
);

ViBox.addModule("contentShelf",
	/*	Arg:
			<OBJ> data = {
				<BOO> [unscrollable] = true means the contentShelf is unable to scroll; default is false
				<BOO> [animation] = true means the big poster animation runs; default is false
				<ARR> [contentsOnShelfs] = the array of elements which are to be placed inside the div.contentShelf-shelf elements. One element is for one shelf. The first one is for the first shelf. 
			}
	*/
	function (data) {
		
		var field = {
				unscrollable : {
					__if : "{{#unscrollable}}",
					__endif : "{{/unscrollable}}"
				},
				animation : {
					__if : "{{#animation}}",
					__endif : "{{/animation}}"
				}
			},
			html = 	 '<div '
					+	'class="contentShelf' + field.unscrollable.__if + ' unscrollable' + field.unscrollable.__endif + '"'
					+'>'				
					+	'<div '
					+		'class="contentShelf-bigPoster' + field.animation.__if + ' animation' + field.animation.__endif + '"'
					+	'></div>'
					+'</div>';
					
		return Mustache.render(html, data);
	},
	function (contentShelf, data) {
		
		if (ViBox.isObj(data) && ViBox.isArr(data.contentsOnShelfs)) {
			
			data.contentsOnShelfs.forEach(function (elem, idx, arr) {
				
				if (ViBox.isHTMLElem(elem)) {					
					var div = document.createElement("DIV");
					div.className = "contentShelf-shelf";
					div.appendChild(elem);
					contentShelf.appendChild(div);
				}
			});			
		}
		
		return contentShelf;
	}
);

ViBox.addModule("dramaWall",
	/*	Arg:
			<OBJ> data = {
				<STR> [wallTitle] = the title of this dramaWall
				<ARR> dramas = the array of drama info. Must be 4 dramas. Each drama info has to carry the beloe properties:
							   <STR> title = the drama title
							   <STR> dstURL = the URL to go to when clicking on drama
							   <STR> posterURL = the drama poster's URL
			}
	*/
	function (data) {		
		
		if (ViBox.isObj(data) && ViBox.isArr(data.dramas) && data.dramas.length == 4) {
			
			var tiles =[],
				field = {
					wallTitle : {
						__if : "{{#wallTitle}}",
						__endif : "{{/wallTitle}}",
						value : "{{wallTitle}}"
					}
				};
			
			data.dramas.forEach(function (drama, idx, arr) {
				
				if (ViBox.isStr(drama.title) && ViBox.isStr(drama.dstURL) && ViBox.isStr(drama.posterURL)) {
					
					if (idx % 2 == 0) {
						tiles.push(
							 '<a class="dramaWall-tile dramaWall-tile-leftTile" href="' + drama.dstURL + '">'
							+	'<img class="dramaWall-tile-poster" src="' + drama.posterURL + '" />'
							+	'<div class="dramaWall-tile-title">' + drama.title + '</div>'
							+'</a>'
						); 
					} else {
						tiles.push(
							 '<a class="dramaWall-tile dramaWall-tile-rightTile" href="' + drama.dstURL + '">'
							+	'<img class="dramaWall-tile-poster" src="' + drama.posterURL + '" />'
							+	'<div class="dramaWall-tile-title">' + drama.title + '</div>'
							+'</a>'
						);
					}
				}
			});
			
			if (tiles.length == 4) {
				var html =	'<div class="dramaWall">'
							+	field.wallTitle.__if
							+		'<h3>' + field.wallTitle.value + '</h3>'
							+	field.wallTitle.__endif
							+	'<div class="dramaWall-tiles">'
							+		tiles[0] + tiles[1] + tiles[2] + tiles[3]
							+		'<div class="dramaWall-moreBtn">More</div>'
							+	'</div>'
							+'</div>';
				return Mustache.render(html, data);
			}
		}
		return null;
	}
);

