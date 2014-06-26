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