'use strict';

var linker = require('di-linker');
var path = require('path');
var src = [
	path.resolve(__dirname, 'app/server/**/*.js')
];

linker(src, require)
		.bootstrap('/')
		.on('error', console.error.bind(console));
