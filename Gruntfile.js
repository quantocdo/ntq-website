'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			out: 'build/out',
			css: 'build/out/css',
		},
		jscs: {
			options: {
				config: 'build/rules/.jscsrc',
			},
			client: {
				src: [
					'app/public/**/*.js',
				],
			},
			server: {
				src: [
					'*.js',
					'app/server/**/*.js',
					'!node_modules',
				],
			},
		},
		jshint: {
			client: {
				options: {
					jshintrc: 'build/rules/.jshintrc-client',
				},
				src: '<%= jscs.client.src %>',
			},
			server: {
				options: {
					jshintrc: 'build/rules/.jshintrc-server',
				},
				src: '<%= jscs.server.src %>',
			},
		},
		stylus: {
			options: {
				use: [
					require('kouto-swiss')
				],
			},
			dev: {
				files: [{
					src: [
						'*.styl',
						'!_*.styl',
					],
					cwd: 'app/public/stylus',
					dest: 'build/out/css',
					ext: '.css',
					expand: true,
				}, {
					src: [
						'pages/*.styl',
						'!**/_*.styl',
					],
					cwd: 'app/public/stylus',
					dest: 'build/out/css',
					ext: '.page.css',
					extDot: 'first',
					flatten: true,
					expand: true,
				}],
			},
		},
		copy: {
			img: {
				files: [{
					expand: true,
					cwd: 'app/public/img',
					src: '**/*',
					dest: 'build/out/img',
				}],
			},
			fontawesome: {
				files: [{
					expand: true,
					cwd: 'bower_components/font-awesome-stylus/fonts',
					src: '**/*',
					dest: 'build/out/fonts'
				}]
			}
		},
		imagemin: {
			static: {
				files: [{
					expand: true,
					cwd: 'app/public/img',
					src: '**/*.{png,jpg,gif}',
					dest: 'build/out/img'
				}]
			}
		},
		develop: {
			dev: {
				file: 'index.js',
				env: {
					NODE_ENV: 'development',
				},
			},
			nighty: {
				file: 'index.js',
				env: {
					NODE_ENV: 'nighty',
				},
			},
		},
		watch: {
			options: {
				spawn: false,
			},
			server: {
				files: '<%= jscs.server.src %>',
				tasks: [
					'jscs:server',
					'jshint:server',
					'develop:dev',
				],
			},
			client: {
				files: '<%= jscs.client.src %>',
				tasks: [
					'jscs:client',
					'jshint:client',
				],
			},
			stylus: {
				files: [
					'app/public/stylus/**/*.styl',
				],
				tasks: [
					'clean:css',
					'stylus:dev',
				],
			},
		},
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [
		'clean:css',			// clean last ouput
		'jscs',					// check code style
		'jshint',				// check static code
		'stylus:dev',			// generate CSS
		// 'copy:fontawesome',		// copy font-awesome
		// 'copy:img',			// copy image
		// 'imagemin:static',		// optimize images
		'develop:dev',			// start application
		'watch',				// watch file changes
	]);
};
