(function (ViBox, React, reactHelp) {
	
	"use strict";
	
	var renderHelpClassNames = reactHelp.renderClassNames;

	/*	Properties:
			[ React props ]
			<OBJ> _render = the obj holding params for rendering:
				<STR> [title] = the borad title
				<ARR<STR>> [boxLayout] = the layout of contentBox module, couble have the "halfBox" and "quarterBox" layout. The array element order is the layout order.
				> [boxClassName] = Refer to the local renderHelpClassNames function
	*/
	var ContentBox = React.createClass({
		
		render : function () {
			
			var boxs,
				title,
				_render = ViBox.isObj(this.props._render) ? this.props._render : {};
			
			title = ViBox.isStr(_render.title) ? _render.title : "";
			
			if (ViBox.isArr(_render.boxLayout)) {
		
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
					
						if (type === boxLayout.halfBox.type) {
							
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
	
	/*	Properties:
			[ React props ]
			<OBJ> _render = the obj holding params for rendering:		
				<STR> size = "L" or "S"
				<STR> dstHref = the URLto destination when clicking on drama box
				<STR> posterSrc = the poster's URL
				<STR> title = the title
	*/
	var DramaBox = React.createClass({
	
		render : function () {
			
			var _render = ViBox.isObj(this.props._render) ? this.props._render : null;
			
			if (!_render) return null;			
			
			var sizeClass = (_render.size === "L") ? "dramaBox-size-L" : "dramaBox-size-S";
			
			return (			
				<a href={_render.dstHref} className={ "dramaBox " + sizeClass }>
					<img className="dramaBox-poster" src={_render.posterSrc} />
					<div className="dramaBox-title">{_render.title}</div>
				</a>
			);
		}
	});
		
	ViBox.addModule("dramaBox", DramaBox, null);
	ViBox.addModule("contentBox", ContentBox, null);
	
}(ViBox, React, ViBox.exp_reactHelp));
