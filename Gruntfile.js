'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
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
		},
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [
		'jscs',
		'jshint',
		'develop:dev',
		'watch',
	]);
};
