module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		
		dir : {			
			jsSrc : "./mockup/js/src",
			jsBuild : "./mockup/js/build",
			jsTmpBuild : "./mockup/js/tmpbuild"
		},
		
		concat : {
		
			options : {
				separator : ";"
			},
			
			static_mappings : {
				
				files : [					
					{ dest : "<%= dir.jsBuild %>/std.jsx", src : [ "<%= dir.jsSrc %>/std.js", "<%= dir.jsSrc %>/std_webModule.jsx" ] },
					{ dest : "<%= dir.jsBuild %>/web_std.jsx", src : [ "<%= dir.jsSrc %>/web_std.js" ] },
					{ dest : "<%= dir.jsBuild %>/mobile_std.jsx", src : [ "<%= dir.jsSrc %>/mobile_std.js" ] }					
				]
			}
		},
		
		shell: {
			'build-jsx': {
			
				command: [
					//'mkdir <%= dir.jsTmpBuild %>',
					'jsx -x jsx <%= dir.jsBuild %> <%= dir.jsBuild %>',
					'rm -rf <%= dir.jsBuild %>/.module-cache/'
				].join(' && '),
				
				stdout: true,
				
				failOnError: true
			},
			
			"clean-up" : {
			
				command: [				
					'rm -rf <%= dir.jsBuild %>/*.jsx'
				].join(' && '),
				
				stdout: true,
				
				failOnError: true
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Default task(s).
	grunt.registerTask('test', ["concat"]);
	grunt.registerTask('default', ["concat", "clean-up"]);

};