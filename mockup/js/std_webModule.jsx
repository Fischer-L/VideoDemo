(function (ViBox) {

		var SignupProcess = React.createClass({
			
			render : function () {
			
				return (
					<div className="signupProcess">						
						<SignupProcess.ProcessBoard />
						<SignupProcess.ActionForm />						
					</div>
				);
			}
		});
		
		SignupProcess.ProcessBoard = React.createClass({
	
			render : function () {
				
				return (
					<div class="signupProcess-processBoard">
						
						
						<div class="clear"></div>
						
					</div>
				);
			}
		});
		
		SignupProcess.ProcessBoard.Board = React.createClass({
			
			render : function () {
				
				return (
					<div className={ "signupProcess-processBoard-board" + (this.prop.classNames.length > 0 ? " " + this.prop.classNames.length.join(" ") : ""); }>
					
						<div className="signupProcess-processBoard-boardShadow">
							<div className="signupProcess-processBoard-title"></div>
							<div className="signupProcess-processBoard-arw"></div>
						</div>
						
					</div>
				);
			}
		});
		
		SignupProcess.ActionForm = React.createClass({
	
			render : function () {
			}
		});
		
		var html =	 //'<div class="signupProcess">'
		
					//+	'<div class="signupProcess-processBoard">'
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
					//+		'<div class="clear"></div>'
					//+	'</div>'
					
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
					//+'</div>';


}(ViBox));