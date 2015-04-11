(function (ViBox, React, reactHelp) {
	
	"use strict";
		
	/*	Properties:
			[ React props ]
			<OBJ> _render = the obj holding params for rendering:
				<BOO> [unscrollable] = true means the contentShelf is unable to scroll; default is false
				<BOO> [animation] = true means the big poster animation runs; default is false
				<ARR<ELM>> [contentsOnShelfs] = the array of HTML elements which are to be placed inside the div.contentShelf-shelf elements. One element is for one shelf. The first one is for the first shelf.
	*/
	var ContentShelf = React.createClass({
		
		render : function () {
			
			return (			
				<div className={ "contentShelf" + (this.props._render.unscrollable === true ? " unscrollable" : "") } >				
					<div className={ "contentShelf-bigPoster" + (this.props._render.animation === true ? " animation" : "") }></div>
				</div>
			);			
		}
	}); {
		
		ContentShelf.domEnhancer = function (contentShelf, data) {
		
			if (ViBox.isObj(data) && ViBox.isArr(data._render.contentsOnShelfs)) {
				
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
	}	
		
	/*	Properties:
			[ React props ]
			<OBJ> _render = the obj holding params for rendering:
				<STR> [wallTitle] = the title of this dramaWall
				<ARR<OBJ>> dramas = the array of drama info obj. Must be 4 dramas. Each drama info has to be the rendering props obj of the DramaWall.tile React class (Except for the posAt).
	*/
	var DramaWall = React.createClass({
		
		render : function () {
			
			var tiles = wallTitle = null;
			
			if (ViBox.isStr(this.props._render.wallTitle)) {
				wallTitle = <h3>{this.props._render.wallTitle}</h3>;
			}
			
			if (ViBox.isArr(this.props._render.dramas)) {
					
				tiles = [];
				
				var dr,
					i = 0,
					j = this.props._render.dramas.length;
				
				for (; i < j; i++) {
					
					dr = ViBox.simpleCopy(props._render.dramas[i]);
					
					if (ViBox.isObj(dr)) {
						
						dr.posAt = (i % 2 == 0) ? "left" : "right";
						
						tiles.push( <DramaWall.tile _render={dr} /> );
					}
				}
				
				if (tiles.length <= 0) tiles = null;
			}
			
			return (			
				<div className="dramaWall">
				
					{wallTitle}
					
					<div className="dramaWall-tiles">					
						{tiles}						
						<div className="dramaWall-moreBtn">More</div>
					</div>
					
				</div>
			);
		}
	}); {		
		
		/*	Properties:
				[ React props ]
				<OBJ> _render = the obj holding params for rendering:
					<BOO> posAt = "left" or "right" which means tile is at left or right side
					<STR> title = the drama title
					<STR> dstURL = the URL to go to when clicking on drama
					<STR> posterURL = the drama poster's URL
		*/
		DramaWall.tile = React.createClass({
			
			render : function () {
				
				var cls = "dramaWall-tile " + (this.props._render.posAt === "left" ? "dramaWall-tile-leftTile" : "dramaWall-tile-rightTile");
				
				return (				
					<a className={cls} href{this.props._render.dstURL} >					
						<img className="dramaWall-tile-poster" src={this.props._render.posterURL} />
						<div className="dramaWall-tile-title">{this.props._render.title}</div>						
					</a
				);
			}
		});
		
	}
	
	ViBox.addModule("contentShelf", ContentShelf, ContentShelf.domEnhancer);
	ViBox.addModule("dramaWall", DramaWall);
	
}(ViBox, React, ViBox.reactHelp));
