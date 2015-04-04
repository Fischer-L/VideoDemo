module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		
		jsDir : "./mockup/js",
		
		shell: {
			'build-jsx': {
			
				command: [				
					'jsx -x jsx <%= jsDir %> <%= jsDir %>',					
					'rm -rf <%= jsDir %>/.module-cache/'
				].join(' && '),
				
				stdout: true,
				
				failOnError: true
			}
		} 
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-shell');

	// Default task(s).
	grunt.registerTask('default', ['shell:build-jsx']);

};