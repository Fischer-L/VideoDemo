module.exports = function(grunt) {

	function formaStr () { // From : http://jsfiddle.net/joquery/9KYaQ/
		var theString = arguments[0];
		for (var i = 1; i < arguments.length; i++) {
			var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
			theString = theString.replace(regEx, arguments[i]);
		}
		return theString;
	};
	
	var env = {}; {
		
		env.jsBuildMiddleExt = ".js.jsx";
		
		env.dir = {}; {		
			env.dir.fileRoot = ".\\mockup",
			env.dir.localhost = "C:\\AppServ\\www\\VideoDemo",
		
			env.dir.jsSrc = env.dir.fileRoot + "\\js\\src",
			env.dir.jsBuild = env.dir.fileRoot + "\\js\\build"
		};
		
		env.file = {
			
			jsSrc : {			
				mustache : env.dir.jsSrc + "/mustache.js",			
				react : env.dir.jsSrc + "/react.min.js",			
				JSXTransformer : env.dir.jsSrc + "/JSXTransformer.js",

				std : env.dir.jsSrc + "/std.js",
				web_std : env.dir.jsSrc + "/web_std.js",
				mobile_std : env.dir.jsSrc + "/mobile_std.js"
			},
			
			jsxSrc : {
				std_webModule : env.dir.jsSrc + "/std_webModule.jsx.js"
			},
			
			jsBuildMiddle : {
				std : env.dir.jsBuild + "/std" + env.jsBuildMiddleExt,
				web_std : env.dir.jsBuild + "/web_std" + env.jsBuildMiddleExt,
				mobile_std : env.dir.jsBuild + "/mobile_std" + env.jsBuildMiddleExt				
			},
			
			jsBuild : {
				externaLib : env.dir.jsBuild + "/externaLib.js"
			}
		};	
	};
	
	// Project configuration.
	grunt.initConfig({
		
		concat : {
		
			options : {
				separator : ";"
			},
			
			for_local_test : {
				
				files : [
					{ dest : env.file.jsBuild.externaLib, src : [ env.file.jsSrc.mustache, env.file.jsSrc.react, env.file.jsSrc.JSXTransformer ] }
				]
			},
			
			for_online : {
				
				files : [
					{ dest : env.file.jsBuild.externaLib, src : [ env.file.jsSrc.mustache, env.file.jsSrc.react ] },
					{ dest : env.file.jsBuildMiddle.std, src : [ env.file.jsSrc.std, env.file.jsxSrc.std_webModule ] },
					{ dest : env.file.jsBuildMiddle.web_std, src : [ env.file.jsSrc.web_std ] },
					{ dest : env.file.jsBuildMiddle.mobile_std, src : [ env.file.jsSrc.mobile_std ] }					
				]
			}
		},
		
		shell: {
		
			copy_for_local_test : {
			
				command: [
					formaStr("xcopy /E {0} {1}", env.dir.jsSrc, env.dir.jsBuild),
					formaStr('rm -rf {0}/*', env.dir.localhost),
					formaStr("xcopy /E {0} {1}", env.dir.fileRoot, env.dir.localhost)			
				].join(' && '),
				
				stdout: true,
				
				failOnError: true				
			},
		
			build_jsx: {
			
				command: [
					formaStr('jsx -x jsx {0} {1}', env.dir.jsBuild, env.dir.jsBuild)			
				].join(' && '),
				
				stdout: true,
				
				failOnError: true
			},
			
			set_up : {
			
				command: [
					formaStr('rm -rf {0}', env.dir.jsBuild) // Clean the old files
				].join(' && '),
				
				stdout: true,
				
				failOnError: true
			},
			
			clean_up : {
			
				command: [
					formaStr('rm -rf {0}/.module-cache/', env.dir.jsBuild),
					formaStr("rm -rf {0}", env.dir.jsBuild + "/*" + env.jsBuildMiddleExt)
				].join(' && '),
				
				stdout: true,
				
				failOnError: true
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Tasks
	grunt.registerTask('local_test', [ "shell:set_up", "concat:for_local_test", "shell:copy_for_local_test" ] );
	grunt.registerTask('default', [ "shell:set_up", "concat:for_online", "shell:build_jsx", "shell:clean_up" ]);

};