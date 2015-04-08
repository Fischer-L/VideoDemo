
(function (ViBox) {
	
	"use strict";
	
	/*	Func:
			Help constructing the string of css class selectors from the rendering param
		Arg:
			> src = could be
				<ARR<STR>> the array of css classes being applied or
				<OBJ> the obj holding the properpty of <ARR<STR>> classNames. This classNames property is the array of css classes being applied.
		Return:
			@ OK: A string of css class selectors which is ready to be appended
			@ NG: ""
	*/
	function renderHelpClassNames(src) {
		
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

	var ContentBox = React.createClass({
		
		render : function () {
			
			var boxs,
				title,
				_render = ViBox.isObj(this.props._render) ? this.props._render : {};
			
			title = ViBox.isStr(_render.title) ? _render.title : "";
			
			if (_render.isArr(data.boxLayout)) {
		
				var i,
					
					type,
					
					totalLayout = 1,
					
					boxLayout = {
					
						halfBox : {
							type : "halfBox",
							layoutShare : 0.5
						},
						
						quarterBox : {
							type : "quarterBox",
							layoutShare : 0.25
						}
					};
				
				boxs = [];
				
				for (i = 0; i < _render.boxLayout.length; i++) {
					
					type = _render.boxLayout[i];
					
					if (ViBox.isObj(boxLayout[type])) {
					
						if (type === boxLayout.halfBox) {
							
							boxs.push(<div className="contentBox-halfBox"></div>);
							
						} else {
							
							boxs.push(<div className="contentBox-quarterBox"></div>);
						}
						
						totalLayout -= boxLayout[type].layoutShare;
					}
					
					if (totalLayout <= 0) {
						break;
					}
				}
				
				if (totalLayout !== 0) boxs = null;
			}
			
			return (
				<div className={ "contentBox" + renderHelpClassNames(_render.boxClassName) } >					
					<div className="contentBox-title">{title}</div>					
					<div className="contentBox-content">{boxs}</div>
					<div className="clear"></div>					
				</div>
			);
		}
	});
	
}(ViBox));
