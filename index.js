'use strict';

var di = require('di-linker');
var path = require('path');
var src = [
	path.resolve(__dirname, 'app/server/**/*.js')
];

di.walk(src, require).then(function(context) {
	return context.bootstrap(['/']);
}).catch(console.error.bind(console));
