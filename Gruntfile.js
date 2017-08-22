'use strict';

var _ = require('lodash');
var assets = require('./build/assets.json');
var cache = null;

module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			out: 'build/out',
			css: 'build/out/css',
			tmp: 'build/.tmp'
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
			prod: {
				files: [{
					src: [
						'*.styl',
						'!_*.styl',
					],
					cwd: 'app/public/stylus',
					dest: 'build/.tmp/css',
					ext: '.css',
					expand: true,
				}, {
					src: [
						'pages/*.styl',
						'!**/_*.styl',
					],
					cwd: 'app/public/stylus',
					dest: 'build/.tmp/css',
					ext: '.page.css',
					extDot: 'first',
					flatten: true,
					expand: true,
				}]
			}
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
			},
			video: {
				files: [{
					expand: true,
					cwd: 'app/public/video',
					src: '**/*',
					dest: 'build/out/video'
				}]
			},
			replace: {
				options: {
					process: function(content, filePath) {
						if (!cache) {
							// create map
							cache = [];

							// console.log(grunt.filerev.summary);

							_.forEach(grunt.filerev.summary, function(rev, orig) {
								var origFile = orig.replace('build/out', '');
								var revFile = rev.replace('build/out', '');

								cache.push({
									regex: new RegExp(origFile, 'g'),
									value: revFile
								});
							});
						}

						_.forEach(cache, function(pattern) {
							content = content.replace(pattern.regex, pattern.value);
						});

						return content;
					}
				},
				files: [{
					expand: true,
					cwd: 'build/.tmp/css/',
					src: '**/*',
					dest: 'build/out/css'
				}]
			}
		},
		imagemin: {
			options: {
				use: [
					require('imagemin-mozjpeg')({
						quality: 80,
						progressive: true
					}),
					require('imagemin-pngquant')({
						quality: '65-80'
					}),
					require('imagemin-gifsicle')({
						interlaced: true,
						optimizationLevel: 3
					})
				]
			},
			static: {
				files: [{
					expand: true,
					cwd: 'app/public/img',
					src: '**/*.{png,jpg,gif,ico}',
					dest: 'build/out/img'
				}]
			}
		},
		uglify: {
			options: {
				compress: {
					drop_console: true
				}
			},
			prod: {
				files: assets.js
			}
		},
		filerev: {
			css: {
				src: 'build/out/css/**/*.css'
			},
			img: {
				src: 'build/out/img/**/*.{png,jpg,gif,ico}'
			},
			js: {
				src: 'build/out/js/**/*.js'
			},
			video: {
				src: 'build/out/video/**/*'
			}
		},
		filerev_assets: {
			prod: {
				options: {
					cwd: 'build/out',
					dest: 'build/out/rev.json'
				}
			}
		},
		po2json_angular_translate: {
			dist: {
				files: {
					'app/server/config/translations/': [
						'app/server/config/translations/*.po'
					]
				}
			}
		},
		develop: {
			dev: {
				file: 'index.js',
				env: {
					NODE_ENV: 'development',
				},
			},
			nightly: {
				file: 'index.js',
				env: {
					NODE_ENV: 'nightly',
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
					'develop:dev',
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
		'copy:fontawesome',		// copy font-awesome
		'develop:dev',			// start application
		'watch',				// watch file changes
	]);

	grunt.registerTask('build', [
		'clean:out',
		'copy:fontawesome',
		'imagemin:static',
		// 'copy:img',				// save time
		'filerev:img',
		'stylus:prod',			// process css [begin]
		'copy:replace',
		'filerev:css',			// process css [end]
		'uglify:prod',			// process js [begin]
		'filerev:js',			// process js [end]
		'copy:video',
		'filerev:video',
		'filerev_assets',
		'clean:tmp'
	]);

	grunt.registerTask('test', [
		'build',
		'develop:nightly'
	]);

	grunt.registerTask('translate', [
		'po2json_angular_translate'
	]);
};
