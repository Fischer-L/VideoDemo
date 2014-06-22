ViBox.RESRC.url.webPlayerPage = "./player.php";
ViBox.addModule("contentBox",
	/*	Arg:
			<OBJ> data = {
				<STR> title = the box title
				<ARR> [boxClassName] = the array of CSS class selectors for contentBox module
				<ARR> [boxLayout] = the layout of contentBox module, couble have the "halfBox" and "quarterBox" layout. The array element order is the layout order.
			}
	*/
	function (data) {
		
		var field = {
				boxClassName : {
					__if : "{{#boxClassName}}",
					__endif : "{{/boxClassName}}",
					values : "{{.}}"
				},
				title : "{{title}}",
				boxLayoutHTML : "{{boxLayoutHTML}}"
			},
			boxLayout = {
				halfBox : {
					layoutShare : 0.5,
					html : '<div class="contentBox-halfBox"></div>'
				},
				quarterBox : {
					layoutShare : 0.25,
					html : '<div class="contentBox-quarterBox"></div>'
				}
			};
		
		var boxLayoutHTML = "";		
		if (ViBox.isArr(data.boxLayout)) {	
		
			var i,
				totalLayout = 1;
				
			for (i = 0; i < data.boxLayout.length; i++) {				
				if (   ViBox.isObj(boxLayout[data.boxLayout[i]])
					&& ViBox.isStr(boxLayout[data.boxLayout[i]].html)
				) {
					boxLayoutHTML += boxLayout[data.boxLayout[i]].html;
					totalLayout -= boxLayout[data.boxLayout[i]].layoutShare;
				}
				if (totalLayout <= 0) {
					break;
				}
			}
		}
		
		var tmpl =	 '<div '
					+	'class="contentBox'
					+		field.boxClassName.__if
					+			' ' + field.boxClassName.values
					+		field.boxClassName.__endif
					+	'"'
					+'>'
					+	'<div class="contentBox-title">' + field.title + '</div>'			
					+	'<div class="contentBox-content">' + boxLayoutHTML + '</div>'
					+	'<div class="clear"></div>'
					+'</div>';
		
		return Mustache.render(tmpl, data);
	}
);
ViBox.addModule("dramaBox",
	/*	Arg:
			<OBJ> data = {
				<STR> size = "L" or "S"
				<STR> dstHref = the URLto destination when clicking on drama box
				<STR> posterSrc = the poster's URL
				<STR> title = the title
			}
	*/
	function (data) {
		var field = {
				size : "{{size}}",
				dstHref : "{{dstHref}}",
				posterSrc : "{{posterSrc}}",
				title : "{{title}}"
			},
			tmpl = 	 '<a '
					+	'class="dramaBox' + ' ' + 'dramaBox-size-' + field.size + '"'
					+	'href="' + field.dstHref + '"'
					+ '>'
					+	'<img class="dramaBox-poster" src="' + field.posterSrc + '" />'
					+	'<div class="dramaBox-title">' + field.title + '</div>'
					+'</a>';
		return Mustache.render(tmpl, data);
	}
);