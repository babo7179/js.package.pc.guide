module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';',
				stripBanners: true,
      			banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			jquery_plugins: {
				src: [
					'<%= pkg.path.plugin %>/jquery.navigate.js',
					'<%= pkg.path.plugin %>/jquery.stateAlarm.js',
					'<%= pkg.path.plugin %>/jquery.dotdotdot.js', 
					'<%= pkg.path.plugin %>/jquery.form.js', 
					'<%= pkg.path.plugin %>/jquery.validate.js'
				],
				dest: '<%= pkg.path.jquery %>/jquery.plugin.pkg.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				report: 'min'
			},
			form: {
				src: '<%= pkg.path.plugin %>/jquery.form.js',
				dest: '<%= pkg.path.plugin %>/jquery.form.min.js'
			},
			layer: {
				src: '<%= pkg.path.plugin %>/jquery.layer.js',
				dest: '<%= pkg.path.plugin %>/jquery.layer.min.js'
			},
			checkboxGroup: {
				src: '<%= pkg.path.plugin %>/jquery.checkboxGroup.js',
				dest: '<%= pkg.path.plugin %>/jquery.checkboxGroup.min.js'
			},
			select: {
				src: '<%= pkg.path.plugin %>/jquery.select.js',
				dest: '<%= pkg.path.plugin %>/jquery.select.min.js'
			},
			stateAlarm: {
				src: '<%= pkg.path.plugin %>/jquery.stateAlarm.js',
				dest: '<%= pkg.path.plugin %>/jquery.stateAlarm.min.js'
			},
			jquery_plugins : {
				options:{
					sourceMap : true,
					sourceMapName:'<%= pkg.path.jquery %>/jquery.plugin.pkg.min.map'
				},
				files : {
					'<%= pkg.path.jquery %>/jquery.plugin.pkg.min.js' : [
						'<%= pkg.path.jquery %>/jquery.plugin.pkg.js'
					]
				}
			}
		},
		jsdoc : {
			dist : {
				src : ['<%= pkg.path.plugin %>/jquery.plugin.sample.js'],
				// src : ['<%= pkg.path.plugin %>/jquery.plugin.sample.js', 'scripts/jquery/jquery.utils.js'],
				options : {destination : 'doc'}
			}
		},
		less : {
			development: {
				options: {
					paths: ["assets/css"]
				},
				files: {
					"styles/default.less.css": "styles/default.less"
				}
			}
		}
		
	});
	
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify', 'jsdoc']);
	
	grunt.registerTask('doc', ['jsdoc']);
	
	grunt.registerTask('min', ['concat', 'uglify']);
	
	// grunt.registerTask('concat', ['concat']);
	
	// grunt.registerTask('less', ['less']);
};