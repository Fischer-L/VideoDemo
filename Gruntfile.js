module.exports = function(grunt) {
	
	var env = {}; {
	
		env.dir = {			
			fileRoot : "./mockup",
			localhost : "C:\\AppServ\\www\\VideoDemo",
		
			jsSrc : "./mockup/js/src",
			jsBuild : "./mockup/js/build",
			jsTmpBuild : "./mockup/js/tmpbuild"
		};
		
		env.file = {
			
			jsSrc : {			
				mustache : env.dir.jsSrc + "/mustache.js",			
				react : env.dir.jsSrc + "/react.min.js",			
				JSXTransformer : env.dir.jsSrc + "/JSXTransformer.js"			
			},
			
			jsBuild : {
				externaLib : env.dir.jsBuild + "/externaLib.js"
			}
		};	
	};
	
	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		
		concat : {
		
			options : {
				separator : ";"
			},
			
			for_local_test : {
				
				files : [
					{ dest : env.file.jsBuild.externaLib, src : [ env.file.jsSrc.mustache, env.file.jsSrc.reacr, env.file.jsSrc.JSXTransformer ] }
					
					
				]
			},
			
			for_online : {
				
				files : [					
					{ dest : "<%= dir.jsBuild %>/std.js", src : [ "<%= dir.jsSrc %>/std.js", "<%= dir.jsTmpBuild %>/std_webModule.js" ] },
					{ dest : "<%= dir.jsBuild %>/web_std.js", src : [ "<%= dir.jsSrc %>/web_std.js" ] },
					{ dest : "<%= dir.jsBuild %>/mobile_std.js", src : [ "<%= dir.jsSrc %>/mobile_std.js" ] }					
				]
			}
		},
		
		shell: {
		
			copy_to_localhost : {
				
				command : "xcopy /E <%= dir.fileRoot %> <%= dir.localhost %>",
				
				stdout: true,
				
				failOnError: true
				
			},
		
			build_jsx: {
			
				command: [
					'jsx -x jsx <%= dir.jsSrc %> <%= dir.jsBuild %>'				
				].join(' && '),
				
				stdout: true,
				
				failOnError: true
			},
			
			clean_up : {
			
				command: [				
					'rm -rf <%= dir.jsBuild %>/.module-cache/'
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
	
	var defaultasks = [ "shell:build_jsx", "shell:clean_up" ];
	
	grunt.registerTask('local_test', defaultasks.concat("shell:copy_to_localhost"));
	grunt.registerTask('default', defaultasks);

};